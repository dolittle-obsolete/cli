/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import fs from 'fs';
import cSharpInquirer from './cSharpInquirerQuestions';
import global from '../global';

const inquirer = require('inquirer');

const _folders = new WeakMap();
const _fileSystem = new WeakMap();

export class CommandHandlerInquirer {

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
        let choices =  [];
        let commandsMap = this._findCSharpCommands();
        
        commandsMap.forEach((value, key) => {
            value.forEach(commandName => {
                choices.push( {
                    name: key + '.' + commandName,
                    value: commandName
                    });
                })
                choices.push(new inquirer.Separator(''));
            });

        let questions = [{
                type: 'checkbox',
                message: 'Select commands to handle: ',
                name: 'commandNames',
                pageSize: 10,
                choices: choices
            }
        ];
        
        cSharpInquirer.getCSharpQuestions().forEach(question => questions.push(question));

        return inquirer.prompt(questions)
            .then(answers => {
                answers.name = name;
                answers.commands = [];
                answers.imports = [];
                commandsMap.forEach((value, key) => {
                    answers.imports.push( {
                        namespace: key
                    });
                });
                answers.commandNames.forEach(commandName => 
                    answers.commands.push({
                        commandName: commandName
                    }));
                return answers;
            });
    }
    /**
     * Finds and returns the names of the public ICommand classes
     * @returns {Map<string, string[]}
     */
    _findCSharpCommands() {
        
        const nearestCsProj = global.getNearestCsprojFile(process.cwd());
        let filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
        let commandsMap = new Map();
        
        filePaths.forEach(filePath => {
            let content = _fileSystem.get(this).readFileSync(filePath, 'utf8');
            const commandNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*ICommand/);

            if (commandNameMatch !== null && commandNameMatch.length > 0){
                const namespace = global.createCSharpNamespace(global.getFileDir(filePath), nearestCsProj);
                const commandName = commandNameMatch[1];
                let values = commandsMap.get(namespace) || [];
                values.push(commandName);
                commandsMap.set(namespace, values);
            }
        });
        return commandsMap;
    }
}
