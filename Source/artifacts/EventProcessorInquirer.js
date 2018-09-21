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
        
        let choices = this._findCSharpEvents().map(item => {return {name: item}});
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
     * Finds and returns the names of the public IEvent classes
     * @returns [string[]]
     */
    _findCSharpEvents() {
        //TODO: Need to find events in a separate folder. Discuss strategies
        /**
         * Thoughts: Go by convention, folders named Events[.something] are where events are made.
         * Find all events and group them by events folder / Module / Feature, give user a checkbox thing where they can pick events.
         */
        let filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
        let events = [];
        filePaths.forEach(filePath => {
            let content = _fileSystem.get(this).readFileSync(filePath, 'utf8');
            const eventNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IEvent/);
            if (eventNameMatch !== null && eventNameMatch.length > 0){
                events.push(eventNameMatch[1]);
            }
        });
        return events;
    }
}