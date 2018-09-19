/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import fs from 'fs';
import global from '../global'

const inquirer = require('inquirer');

const _folders = new WeakMap();
const _fileSystem = new WeakMap();

export class QueryforInquirer {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    constructor(folders, fileSystem) {
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {String} language
     * @returns {Promise<any>} The answers
     */
    promptUser(language){
        if (language === 'csharp') {
            return this._getCSharpPrompt()
        }
    }

    _getCSharpPrompt() {
        const customReadModel = 'Write read model name';
        const namespace = global.createCSharpNamespace(process.cwd(), global.getNearestCsprojFile());

        let readModelChoices = this._findCSharpReadmodels();
        readModelChoices.push(customReadModel);
        let questions = [
            {
                type: 'input',
                name: 'name',
                message: `What's the Query's name?`
            },
            {
                type: 'rawlist',
                name: 'readModel',
                message: 'Choose a read model: ',
                choices: readModelChoices
            },
            {
                type: 'input',
                name: 'readModelCustom',
                message: 'Write the name of the read model: ',
                when: function(answers) {
                    return answers.readModel === customReadModel;
                }
            },
            {
                type: 'confirm',
                name: 'generatedNamespace',
                message: `Do you want to use this namespace ${namespace}?`,
            },
            {
                type: 'input',
                name: 'namespace',
                message: `Enter the Query's namespace`,
                when: function(answers) {
                    return !answers.generatedNamespace;
                }
            }
        ];

        return inquirer.prompt(questions)
            .then(answers => {
                if (answers.generatedNamespace)
                    answers.namespace = namespace;
                if (answers.readModelCustom !== undefined && answers.readModelCustom !== null)
                    answers.readModel = answers.readModelCustom;

                return answers;
            });
    }
    /**
     * Finds and returns the names of the public readModels
     * @returns [string[]]
     */
    _findCSharpReadmodels() {
        let filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
        let readModels = [];
        filePaths.forEach(filePath => {
            let content = _fileSystem.get(this).readFileSync(filePath, 'utf8');
            const readModelNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IReadModel/);
            if (readModelNameMatch !== null && readModelNameMatch.length > 0){
                readModels.push(readModelNameMatch[1]);
            }
        });
        return readModels;
    }
}