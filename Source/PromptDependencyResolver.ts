/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDependency, IDependencyDiscoverResolver, MissingCoreLanguage, MissingDestinationPath, argumentUserInputType, DiscoverAndPromptDependency, IPromptDependency, confirmUserInputType, dependencyIsPromptDependency, dependencyIsDiscoverDependency, ICanResolveDependencies } from '@dolittle/tooling.common.dependencies';
import inquirer, { Question as InqiurerQuestion } from 'inquirer';
import { Outputter } from './Outputter';

export class PromptDependencyResolver implements ICanResolveDependencies  {
    
    /**
     * Initializes a new instance of {Inquirer}
     * @param {IDependenciesManager} dependenciesManager
     * @param {any} dolittleConfig
     */
    constructor(private _discoverResolver: IDependencyDiscoverResolver, private _dolittleConfig: any, private _outputter: Outputter) { }
    
    canResolve(dependency: IDependency): boolean {
        return  (dependency as any).userInputType !== undefined && (dependency as any).userInputType !== argumentUserInputType;
    }
    
    async resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any> {
        let questions = await this.createQuestions(dependencies, destinationPath, coreLanguage);
        let answers = await inquirer.prompt(questions);
        Object.keys(answers).forEach(name => {
            context[name] = answers[name];
        });
        return context;
    }

    private async createQuestions(dependencies: IDependency[], destinationPath?: string, language?: string): Promise<InqiurerQuestion[]> {
        let questions: InqiurerQuestion[] = [];
        for (let dep of dependencies) {
            if (dep instanceof DiscoverAndPromptDependency || dependencyIsDiscoverDependency(dep) && (<any>dep).userInputType !== undefined) {
                if (!destinationPath) throw new MissingDestinationPath();
                if (!language) throw new MissingCoreLanguage();
                let discoveryResult = await this._discoverResolver.resolve(<DiscoverAndPromptDependency>dep, destinationPath, language, this._dolittleConfig);
                let choices = typeof discoveryResult === 'string' || discoveryResult instanceof String?
                    [discoveryResult]
                    : discoveryResult.length === 0?
                        []
                        : discoveryResult[0].hasOwnProperty('namespace') !== undefined? 
                            (<{value: string, namespace: string}[]>discoveryResult).map(item => new Object(
                                {
                                    name: `${item.namespace}.${item.value}`, 
                                    value: {namespace: item.namespace, value: item.value} 
                                })
                            )
                        : discoveryResult;
            
            questions.push(...this.createPrompt(<DiscoverAndPromptDependency>dep, choices));
            }
            else if (dependencyIsPromptDependency(dep)) questions.push(...this.createPrompt(dep));
            
            else {
                this._outputter.warn(`Found an invalid 'type' on dependency: '${dep.type}'`);
                throw new Error(`Invalid type '${dep.type}'`);
            }
        }
        return questions;
    }
    private createPrompt(dependency: IPromptDependency, choices: any[] = []) {
        const inputType = dependency.userInputType;
        
        if (inputType === 'input') return this.createInputPrompt(dependency.name, dependency.promptMessage);
        let items = dependency.choices !== undefined? 
                dependency.choices.concat(choices)
                : choices;
        if (dependency.customInput) items.push(dependency.customInput);
        if (inputType === 'chooseOne') return this.createListPrompt(dependency, dependency.promptMessage, items);
        else if (inputType === 'chooseMultiple') return this.createCheckboxPrompt(dependency, dependency.promptMessage, items);
        
        else if (inputType === confirmUserInputType ) return this.createConfirmPrompt(dependency, dependency.promptMessage)
        else {
            this._outputter.warn(`Found an invalid 'userInputType' on dependency: '${inputType}'`);
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
    private createListPrompt(dependency: IPromptDependency, message: string, choices: any[] = []): InqiurerQuestion[] {
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
    private createCheckboxPrompt(dependency: IPromptDependency, message: string, choices: any[] = []): InqiurerQuestion[] {
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
    private createConfirmPrompt(dependency: IPromptDependency, promptMessage: string): InqiurerQuestion[] {
        return [
            {
                type: 'confirm',
                name: dependency.name,
                message: promptMessage,
                default: false
            }
        ]
    }
}