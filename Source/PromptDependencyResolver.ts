/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency, ICanResolveSyncDependencies, IDependenciesManager, MissingCoreLanguage, MissingDestinationPath } from '@dolittle/tooling.common.dependencies';
import inquirer, { Question as InqiurerQuestion } from 'inquirer';
import Outputter from './Outputter';

export class PromptDependencyResolver implements ICanResolveSyncDependencies  {
    
    private _dependenciesManager: IDependenciesManager;
    private _dolittleConfig: any;
    /**
     * Initializes a new instance of {Inquirer}
     * @param {IDependenciesManager} dependenciesManager
     * @param {any} dolittleConfig
     */
    constructor(dependenciesManager: IDependenciesManager, dolittleConfig: any) {
        this._dependenciesManager = dependenciesManager;
        this._dolittleConfig = dolittleConfig;   
    }
    canResolve(dependency: Dependency): boolean {
        return dependency.userInputType !== undefined && dependency.userInputType !== 'argument';
    }
    
    resolve(context: any, dependencies: Dependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any> {
        if (!destinationPath) throw MissingDestinationPath.new;
        if (!coreLanguage) throw MissingCoreLanguage.new;
        
        let questions = this.createQuestions(dependencies, destinationPath, coreLanguage);
        return inquirer.prompt(questions)
            .then((answers: any) => {
                Object.keys(answers).forEach(name => {
                    context[name] = answers[name];
                });
                
                return context;
            });
    }

    private createQuestions(dependencies: Dependency[], destinationPath: string, language: string): InqiurerQuestion[] {
        let questions: InqiurerQuestion[] = [];
        dependencies.forEach(dep => {
            if (dep.type === 'discover') {
                if (dep.userInputType) {
                    let discoveryResult = this._dependenciesManager.discover(dep, destinationPath, language, this._dolittleConfig);
                    
                    let choices = typeof discoveryResult === 'string' || discoveryResult instanceof String?
                        [discoveryResult]
                        : discoveryResult.length === 0?
                            []
                            : discoveryResult[0].hasOwnProperty('namespace') !== undefined? 
                                (<{value: string, namespace: string}[]>discoveryResult).map(item => new Object(
                                    {
                                        name: `${item.namespace}.${item.value}`, 
                                        value: {namespace: item.namespace, value: item.value} 
                                    }))
                                : discoveryResult;
                    questions.push(...this.createPrompt(dep, choices))
                    }
                }
            else if(dep.type === 'userInput') {
                questions.push(...this.createPrompt(dep));
            } 
            else {
                Outputter.warn(`Found an invalid 'type' on dependency: '${dep.type}'`);
                throw new Error(`Invalid type '${dep.type}'`);
            }
        });
        return questions;
    }
    private createPrompt(dependency: Dependency, choices: any[] = []) {
        const inputType = dependency.userInputType;
        
        if (inputType === 'input') {
            return this.createInputPrompt(dependency.name, dependency.promptMessage || '');
        }
        let items = dependency.choices !== undefined? 
                dependency.choices.concat(choices)
                : choices;
        if (dependency.customInput) items.push(dependency.customInput);
        if (inputType === 'chooseOne') {
            
            return this.createListPrompt(dependency, dependency.promptMessage || 'Input', items);
        }
        else if (inputType === 'chooseMultiple') {
            return this.createCheckboxPrompt(dependency, dependency.promptMessage || 'Input', items);
        }
        else {
            Outputter.warn(`Found an invalid 'userInputType' on dependency: '${inputType}'`);
            throw new Error(`Invalid userInputType '${inputType}'`)
        }
    }
    
    private createInputPrompt(name: string, message: string): InqiurerQuestion[]{
        return [{
            type: 'input',
            name: name,
            message: message || ''
        }];
    }
    private createListPrompt(dependency: Dependency, message: string, choices: any[] = []): InqiurerQuestion[] {
        if (! dependency.customInput) {
            return [
                {
                    type: 'list',
                    name: dependency.name,
                    message: message,
                    choices: choices,
                    pageSize: 10
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
                    pageSize: 10
                },
                {
                    type: 'input',
                    name: dependency.name,
                    message: dependency.customInput,
                    when: function(answers: any) {
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
    private createCheckboxPrompt(dependency: Dependency, message: string, choices: any[] = []): InqiurerQuestion[] {
        if (! dependency.customInput) {
            return [
                {
                    type: 'checkbox',
                    name: dependency.name,
                    message: message,
                    choices: choices,
                    pageSize: 10
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
                    pageSize: 10
                },
                {
                    type: 'input',
                    name: dependency.name,
                    message: dependency.customInput,
                    when: function(answers: any) {
                        return answers[dependency.name] === dependency.customInput;
                    }
                }
            ];
        }
    }
}