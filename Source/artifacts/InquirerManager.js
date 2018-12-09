/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
import {Folders} from '../Folders';
import {Logger} from 'winston';
import fs from 'fs-extra';
import { getFileDirPath, getFileName, getFileNameAndExtension, getFileDir } from '../helpers';
/* eslint-enable no-unused-vars */

const inquirer = require('inquirer');
/**
 * @type {WeakMap<InquirerManager, Folders>}
 */
const _folders = new WeakMap();
/**
 * @type {WeakMap<InquirerManager, fs>}
 */
const _fileSystem = new WeakMap();

export class InquirerManager {
    /**
     * Initializes a new instance of {InquirerManager}
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(folders, fileSystem, logger) {
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
        
    }
    /**
     * Prompts the user for additional information and fills the context used for templating
     * @param {string} artifactName
     * @param {string} location
     * @param {BoilerPlate} boilerPlate 
     * @param {any} artifactTemplate
     * 
     * @returns {Promise<any>}
     */
    promptUser(artifactName, location, boilerPlate, artifactTemplate) {
        let context = { name: artifactName };
        let dependencies = [];
        if (boilerPlate.dependencies !== undefined)
            boilerPlate.dependencies.forEach(dependency => dependencies.push(dependency));
        if ( artifactTemplate.dependencies !== undefined)
            artifactTemplate.dependencies.forEach(dependency => dependencies.push(dependency));
        
        let questions = [];

        dependencies.forEach(dependency => {
            if (dependency.type !== 'prompt')
                context = this.generateDependency(dependency, location, context);
        });
        dependencies.forEach(dependency => {
            if (dependency.type === 'prompt')
                questions.push(...this.generatePrompt(dependency, context));
        });

        return inquirer.prompt(questions)
            .then(answers => {
                answers.name = context.name;
                dependencies.forEach(_ => {
                    const field = _.name;
                    if (_.type !== 'prompt' && answers[field] === undefined) {
                        answers[field] = context[field];
                    }
                });
                return answers;
            });
    }
    /**
     * 
     * @param {any} dependency 
     * @param {string} location
     * @param {any} context 
     */
    generateDependency(dependency, location, context) {
        if (dependency.type === 'discover') {
            return this.discover(dependency, location, context);
        }

        throw `Cannot handle dependency type '${dependency.type}'`;
    }
    /**
     * 
     * @param {any} dependency 
     * @param {string} location 
     * @param {any} context 
     */
    discover(dependency, location, context) {
        if (dependency.discoverType === 'namespace') {
            return this.discoverNamespace(dependency, location, context);
        } 
        else if (dependency.discoverType === 'multipleFiles') {
            return this.discoverMultipleFiles(dependency, location, context);
        }

        throw `Cannot handle discoveryType '${dependency.discoverType}'`;
    }
    /**
     * 
     * @param {any} dependency
     * @param {string} location 
     * @param {any} context 
     */
    discoverNamespace(dependency, location, context) {
        const namespace = this.createNamespace(dependency, location);
        context[dependency.name] = namespace;
        return context;
    }
    /**
     * 
     * @param {any} dependency
     * @param {string} location
     * @param {any} context 
     */
    discoverMultipleFiles(dependency, location, context) {
        
        let filePaths = [];
        if (dependency.fromFolders === undefined)
            filePaths = _folders.get(this).searchRecursiveRegex(location, new RegExp(dependency.fileMatch));
        else {
            const folders = _folders.get(this).getNearestDirsSearchingUpwards(location, new RegExp(dependency.fromFolders));
            folders.forEach(folder => filePaths.push(..._folders.get(this).searchRecursiveRegex(folder, new RegExp(dependency.fileMatch))));
        }
        let results = [];
        if (dependency.contentMatch === undefined || dependency.contentMatch === '') { 
            results = filePaths;
        }
        else {
            filePaths.forEach(filePath => {
                let content = _fileSystem.get(this).readFileSync(filePath, 'utf8');
                let theMatch = content.match(new RegExp(dependency.contentMatch));
                if (theMatch !== null && theMatch.length > 0) {
                    let namespace = '';
                    if (dependency.withNamespace)
                        namespace = this.createNamespace(dependency, getFileDirPath(filePath));

                    let choice = dependency.withNamespace?  {name: namespace + '.' + theMatch[1], value: theMatch[1]}
                        : {name: theMatch[1], value: theMatch[1]};
                    results.push(choice);
                }
            });
        }
        context[dependency.name] = results;
        return context;
    }
    /**
     * 
     * @param {any} dependency
     * @param {any} context
     * @returns {any} question
     */
    generatePrompt(dependency, context) {
        if (dependency.promptType === 'input') {
            return this.generateInputPrompt(dependency);
        }
        else if (dependency.promptType === 'rawlist' || dependency.promptType === 'list') {
            return this.generateListPrompt(dependency, context);
        }
        else if (dependency.promptType === 'checkbox') {
            return this.generateCheckboxPrompt(dependency, context);
        }
        
        throw `Cannot handle promptType '${dependency.promptType}'`;

    }
    /**
     * Generate an input prompt
     * @param {any} dependency
     */
    generateInputPrompt(dependency) {
        return [{
            type: 'input',
            name: dependency.name,
            message: dependency.message
        }];
    }
    /**
     * Generate a list prompt
     * @param {any} dependency
     * @param {any} context 
     */
    generateListPrompt(dependency, context) {
        let actualChoices = context[dependency.choices] || dependency.choices;
        if (! dependency.customInput) {
            return [
                {
                    type: dependency.promptType,
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                }
            ];
        }
        else {
            actualChoices.push({name: dependency.customInput, value: dependency.customInput});
            return [
                {
                    type: dependency.promptType,
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                },
                {
                    type: 'input',
                    name: dependency.name,
                    message: dependency.customInput,
                    when: function(answers) {
                        return answers[dependency.name] === dependency.customInput;
                    }
                }
            ];
        }
    }
    generateCheckboxPrompt(dependency, context) {
        let actualChoices = context[dependency.choices] || dependency.choices;
        if (! dependency.customInput) {
            return [
                {
                    type: 'checkbox',
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                }
            ];
        }
        else {
            actualChoices.push({name: dependency.customInput, value: dependency.customInput});
            return [
                {
                    type: 'checkbox',
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                },
                {
                    type: 'input',
                    name: dependency.name,
                    message: dependency.customInput,
                    when: function(answers) {
                        return answers[dependency.name] === dependency.customInput;
                    }
                }
            ];
        }
    }
    /**
     * Creates the namespace
     * @param {any} dependency 
     * @param {string} location
     * @returns {string} the namespace 
     */
    createNamespace(dependency, location) {
        let milestoneRegexp = new RegExp(dependency.milestone);
        const milestonePath = _folders.get(this).getNearestFileSearchingUpwards(location, milestoneRegexp);
        if (milestonePath === null || milestonePath === '') {
            this._logger.warn('Could not discover the namespace');
            return '';
        }
        const milestoneFileName = getFileName(milestonePath);

        let namespaceSegments = [];
        let segmentPath = location;
        let segment = getFileNameAndExtension(segmentPath);
       
        while (_folders.get(this).searchFolderRegex(segmentPath, milestoneRegexp).length === 0) {
            namespaceSegments.push(segment);
            segmentPath = getFileDir(segmentPath);
            segment = getFileName(segmentPath);
        } 
        namespaceSegments = namespaceSegments.reverse();
        
        let namespace = milestoneFileName;
        namespaceSegments.forEach(element => {
            namespace += '.' + element;
        });

        return namespace;
    }
}