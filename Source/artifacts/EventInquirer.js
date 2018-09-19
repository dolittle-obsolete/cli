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
     * @param {String} language
     * @returns {Promise<any>} The answers
     */
    promptUser(language){
        if (language === 'csharp') {
            return this._getCSharpPrompt()
        }
    }

    _getCSharpPrompt() {
        const namespace = global.createCSharpNamespace(process.cwd(), global.getNearestCsprojFile());
        console.log(namespace);
        let questions = [
            {
                type: 'input',
                name: 'name',
                message: `What's the Event's name?`
            },
            {
                type: 'confirm',
                name: 'generatedNamespace',
                message: `Do you want to use this namespace ${namespace}?`,
            },
            {
                type: 'input',
                name: 'namespace',
                message: `Enter the Event's namespace`,
                when: function(answers) {
                    return !answers.generatedNamespace;
                }
            }
        ];

        return inquirer.prompt(questions)
            .then(answers => {
                if (answers.generatedNamespace)
                    answers.namespace = namespace;
                
                return answers;
            });
    }
}