import { Folders } from '../Folders';
import fs from 'fs';

const inquirer = require('inquirer');

const _folders = new WeakMap();
const _fileSystem = new WeakMap();

export class QueryInquirer {

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
        const namespace = "The.Namespace";
        let questions = [
            {
                type: 'input',
                name: 'name',
                message: `What's the Query's name?`
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
                {
                    answers.namespace = namespace;
                }
                return answers;
            });
    }
}