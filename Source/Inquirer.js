/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Dependency, Boilerplate} from '@dolittle/tooling.common'
import Outputter from './Outputter';
import inquirer from 'inquirer';
import { DependenciesManager } from '@dolittle/tooling.common/dist/dependencies/DependenciesManager';

export class Inquirer {
    #_dependenciesManager;
    /**
     * Initializes a new instance of {Inquirer}
     * @param {DependenciesManager} dependenciesManager
     */
    constructor(dependenciesManager) {
        this.#_dependenciesManager = dependenciesManager;   
    }
    /**
     * 
     * @type {DependenciesManager}
     * @readonly
     * @memberof Inquirer
     */
    get dependenciesManager() {
        return this._dependenciesManager;
    }
    /**
     * Prompts the user for additional information and fills the context used for templating
     * @param {any} context
     * @param {Dependency[]} dependencies
     * @param {string} destinationPath
     * @param {string} language 
     * 
     * @returns {Promise<any>}
     */
    promptUser(context, dependencies, destinationPath, language) {
        dependencies = dependencies.filter(dep => {
            if (dep.userInputType !== undefined) return dep.userInputType !== 'argument';
            else return true;
        });
        
        let questions = this.#_createQuestions(dependencies, destinationPath, language);
        return inquirer.prompt(questions)
            .then(answers => {
                Object.keys(answers).forEach(name => {
                    context[name] = answers[name];
                });
                
                return context;
            });
    }

    /**
     *
     *
     * @param {Dependency[]} dependencies
     * @param {string} destinationPath
     * @param {string} language
     * @memberof InquirerManager
     * @returns {any[]}
     */
    #_createQuestions(dependencies, destinationPath, language) {
        let questions = [];
        dependencies.forEach(dep => {
            if (dep.type === 'discover') {
                if (dep.userInputType) {
                    let discoveryResult = this.dependenciesManager.discover(dep, destinationPath, language);
                    
                    let choices = typeof discoveryResult === 'string' || discoveryResult instanceof String?
                        [discoveryResult]
                        : discoveryResult.length === 0?
                            []
                            : discoveryResult[0]['namespace'] !== undefined? 
                                discoveryResult.map(item => new Object(
                                    {
                                        name: `${item.namespace}.${item.value}`, 
                                        value: {namespace: item.namespace, value: item.value} 
                                    }))
                                : discoveryResult;
                    questions.push(...this.#_createPrompt(dep, choices))
                    }
                }
            else if(dep.type === 'userInput') {
                questions.push(...this.#_createPrompt(dep));
            } 
            else {
                Outputter.error(`Found an invalid 'type' on dependency: '${dep.type}'`);
                throw new Error(`Invalid type '${dependency.type}'`);
            }
        });
        return questions;
    }
    /**
     * Generates a prompt question based on the dependency
     * @param {Dependency} dependency
     * @param {any[]} choices
     */
    #_createPrompt(dependency, choices = []) {
        const inputType = dependency.userInputType;
        
        if (inputType === 'input') {
            return this.#_createInputPrompt(dependency.name, dependency.promptMessage);
        }
        let items = dependency.choices !== undefined? 
                dependency.choices.concat(choices)
                : choices;
        if (dependency.customInput) items.push(dependency.customInput);
        if (inputType === 'chooseOne') {
            
            return this.#_createListPrompt(dependency, dependency.promptMessage || 'Input', items);
        }
        else if (inputType === 'chooseMultiple') {
            return this.#_createCheckboxPrompt(dependency, dependency.promptMessage || 'Input', items);
        }
        else {
            Outputter.error(`Found an invalid 'userInputType' on dependency: '${inputType}'`);
            throw new Error(`Invalid userInputType '${inputType}'`)
        }
    }
    
    /**
     * Generate an input prompt
     * @param {string} name
     * @param {string} message
     */
    #_createInputPrompt(name, message) {
        return [{
            type: 'input',
            name: name,
            message: message || ''
        }];
    }
    /**
     * Creates a list prompt
     * @param {Dependency} dependency
     * @param {string} message 
     * @param {any[]} choices 
     */
    #_createListPrompt(dependency, message, choices = []) {
        if (! dependency.customInput) {
            return [
                {
                    type: 'list',
                    name: dependency.name,
                    message: message,
                    choices: choices,
                    pagesize: 10
                }
            ];
        }
        else {
            return [
                {
                    type: 'list',
                    name: dependency.name,
                    message: message,
                    choices: choices,
                    pagesize: 10
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
     * Creates a checkbox prompt
     * @param {Dependency} dependency
     * @param {string} message 
     * @param {any[]} choices 
     */
    #_createCheckboxPrompt(dependency, message, choices = []) {
        if (! dependency.customInput) {
            return [
                {
                    type: 'checkbox',
                    name: dependency.name,
                    message: message,
                    choices: choices,
                    pagesize: 10
                }
            ];
        }
        else {
            return [
                {
                    type: 'checkbox',
                    name: dependency.name,
                    message: message,
                    choices: choices,
                    pagesize: 10
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
}