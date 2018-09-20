/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import fs from 'fs';
import cSharpInquirer from './cSharpInquirerQuestions'

const inquirer = require('inquirer');

const _folders = new WeakMap();
const _fileSystem = new WeakMap();

export class EventInquirer {

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
        let questions = cSharpInquirer.getCSharpQuestions(); 

        return inquirer.prompt(questions)
            .then(answers => {
                answers.name = name;
                
                return answers;
            });
    }
}