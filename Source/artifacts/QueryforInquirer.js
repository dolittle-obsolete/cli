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

        const customReadModel = 'Write read model name';
        let readModelChoices = this._findCSharpReadmodels();
        readModelChoices.push(customReadModel);

        let questions = [
            {
                type: 'rawlist',
                name: 'readModel',
                message: 'Choose a read model: ',
                choices: readModelChoices
            },
            {
                type: 'input',
                name: 'readModel',
                message: 'Write the name of the read model: ',
                when: function(answers) {
                    return answers.readModel === customReadModel;
                }
            }
        ];

        cSharpInquirer.getCSharpQuestions().forEach(question => {
            questions.push(question);
        });

        return inquirer.prompt(questions)
            .then(answers => {
                answers.name = name;
                
                return answers;
            });
    }
    /**
     * Finds and returns the names of the public IReadModel classes
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