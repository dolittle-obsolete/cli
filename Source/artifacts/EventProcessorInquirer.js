/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import fs from 'fs';
import cSharpInquirer from './cSharpInquirerQuestions'
import { Guid } from '../Guid';
import global from '../global';

const inquirer = require('inquirer');

const _folders = new WeakMap();
const _fileSystem = new WeakMap();

const eventsFolderRegex = /Events/;
export class EventProcessorInquirer {

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
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */
    promptUser(flags){
        if (flags.language === 'csharp') {
            return this._getCSharpPrompt(flags.name)
        }
    }
    /**
     * Gets the C# prompt
     * @param {string} name
     */
    _getCSharpPrompt(name) {
        
        let choices = [];
        let eventsMap = this._findCSharpEvents();
        
        eventsMap.forEach((value, key) => {
            value.forEach(eventName => {
                choices.push( {
                    name: key + '.' + eventName,
                    value: eventName
                    });
                })
                choices.push(new inquirer.Separator(''));
            });
        let questions = [{
                type: 'checkbox',
                message: 'Select events: ',
                name: 'eventNames',
                pageSize: 10,
                choices: choices
            }
        ];
        
        cSharpInquirer.getCSharpQuestions().forEach(question => questions.push(question));

        return inquirer.prompt(questions)
            .then(answers => {
                answers.name = name;
                answers.events = [];
                answers.imports = [];
                eventsMap.forEach((value, key) => {
                    answers.imports.push( {
                        namespace: key
                    });
                });
                answers.eventNames.forEach(eventName => 
                    answers.events.push({
                        eventName: eventName,
                        eventProcessor: Guid.create()
                    }));
                return answers;
            });
    }
    /**
     * Finds and returns the names of the public IEvent classes
     * @returns {Map<string, string[]>}
     */
    _findCSharpEvents() {
        //TODO: Need to find events in a separate folder. Discuss strategies
        /**
         * Thoughts: Go by convention, folders named Events[.something] are where events are made.
         * Find all events and group them by events folder / Module / Feature, give user a checkbox thing where they can pick events.
         */
        let eventsFolders = this._findEventsFolders();
        let eventsMap = new Map();
        eventsFolders.forEach(eventFolder => {
            const nearestCsProj = global.getNearestCsprojFile(eventFolder.path);
            let filePaths = _folders.get(this).searchRecursive(eventFolder.path, '.cs');
            
            filePaths.forEach(filePath => {
                let content = _fileSystem.get(this).readFileSync(filePath, 'utf8');
                const eventNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IEvent/);
                
                if (eventNameMatch !== null && eventNameMatch.length > 0) {
                    const namespace = global.createCSharpNamespace(global.getFileDir(filePath), nearestCsProj);
                    const eventName = eventNameMatch[1];
                    let values = eventsMap.get(namespace) || [];
                    values.push(eventName);
                    eventsMap.set(namespace, values);
                }
            });
        });

        return eventsMap;
    }
    /**
     * Finds the folders containing events by convention
     * @returns {any[]} The list of Event folders with name and path
     */
    _findEventsFolders()
    {
        let currentPath = process.cwd();
        let lastPathSepIndex = global.getLastPathSeparatorIndex(currentPath);

        while (lastPathSepIndex != -1 && currentPath != null && currentPath != '')
        {
            let results = [];
            let folders = _folders.get(this).getFoldersIn(currentPath);
            folders.forEach(folder => {
                const folderName = global.getFileName(folder);
                const folderNameMatch = folderName.match(eventsFolderRegex);
                if (folderNameMatch != null && folderNameMatch.length > 0)
                    results.push({name: folderName, path: folder});
            }) 
            if (results.length >= 1)
                return results;
            currentPath = currentPath.substr(0, lastPathSepIndex);
            lastPathSepIndex = global.getLastPathSeparatorIndex(currentPath);
        }
        return [];
    }
}