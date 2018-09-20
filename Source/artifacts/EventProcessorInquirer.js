/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import fs from 'fs';
import cSharpInquirer from './cSharpInquirerQuestions'
import { Guid } from '../Guid';

const inquirer = require('inquirer');

const _folders = new WeakMap();
const _fileSystem = new WeakMap();

let eventNames = [];
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
        let events = [];
        eventNames = this._findCSharpEvents();
        let choices = eventNames.map(item => {return {name: item}});
        console.log('choices: ', choices);
        let questions = [{
                type: 'checkbox',
                message: 'Select events',
                name: 'eventNames',
                choices: choices
            }
        ];
        
        cSharpInquirer.getCSharpQuestions().forEach(question => questions.push(question));

        return inquirer.prompt(questions)
            .then(answers => {
                answers.name = name;
                answers.events = [];
                answers.eventNames.forEach(eventName => 
                    answers.events.push({
                        eventName: eventName,
                        eventProcessor: Guid.create()
                    }));
                return answers;
            });
    }
    /**
     * Finds and returns the names of the public readModels
     * @returns [string[]]
     */
    _findCSharpEvents() {
        //TODO: Need to find events in a separate folder. Discuss strategies
        let filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
        let readModels = [];
        filePaths.forEach(filePath => {
            let content = _fileSystem.get(this).readFileSync(filePath, 'utf8');
            const readModelNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IEvent/);
            if (readModelNameMatch !== null && readModelNameMatch.length > 0){
                readModels.push(readModelNameMatch[1]);
            }
        });
        return readModels;
    }
}