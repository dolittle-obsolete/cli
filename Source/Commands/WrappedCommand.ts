/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Command, ICommand } from '@dolittle/tooling.common.commands';
import { IDependency, dependencyIsPromptDependency, argumentUserInputType, IPromptDependency, IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { IBusyIndicator, ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { Outputter } from '../Outputter';
import { BusyIndicator } from '../BusyIndicator';
import hasHelpOption from '../Util/hasHelpOption';

/**
 * The base class of a {Command} that is wrapped to fit the needs of the CLI. 
 *
 * @export
 * @class Command
 */
export class WrappedCommand extends Command {
    
    static fromCommand(command: ICommand, commandGroup?: string, namespace?: string) {
        const usage = `dolittle${namespace? ' ' + namespace : ''}${commandGroup? ' ' + commandGroup : ''} ${command.name}`;
        return new WrappedCommand(command.name, command.description, usage, commandGroup, undefined, command.shortDescription, command.dependencies, command);
    }
 
    /**
     * The usage text used 
     *
     * @type {string}
     */
    usage: string;
    
    /**
     * The group of commands the command belongs to, if any
     *
     * 
     * @type {string}
     */
    readonly group?: string

    /**
     * The optional help text that is printed as a addition to the description and the usage
     *
     * 
     * @type {string}
     */
    help?: string

    /**
     * Creates an instance of {WrappedCommand}.
     * @param {string} name
     * @param {string} description
     * @param {string} usage
     * @param {string?} group
     * @param {string?} help
     * @param {string[]?} args
     * @memberof Command
     */
    constructor(name: string, description: string, usage: string, group?: string, help?: string, shortDescription?: string, dependencies?: IDependency[],
        private _derivedCommand?: ICommand) {
        super(name, description, false, shortDescription, dependencies)
        this.usage = usage;
        this.group = group;
        this.help = help;
    }

    async action(dependencyResolvers: IDependencyResolvers, currentWorkingDirectory: string, coreLanguage: string, commandArguments: string[], commandOptions: Map<string, any>, namespace?: string,
            outputter: ICanOutputMessages = new Outputter(), busyIndicator: IBusyIndicator = new BusyIndicator()) {
        if (this._derivedCommand) {
            this.extendHelpDocs(this.getAllDependencies(currentWorkingDirectory, coreLanguage, commandArguments, commandOptions, namespace), 
                                this.usage, this.help);
            if (hasHelpOption(commandOptions)) {
                outputter.print(this.helpDocs);
                return;
            }
            await this._derivedCommand.action(dependencyResolvers, currentWorkingDirectory, coreLanguage, commandArguments, commandOptions, namespace, outputter, busyIndicator)
        }
    }

    getAllDependencies(currentWorkingDirectory: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, any>, namespace?: string) {
        return this._derivedCommand? this._derivedCommand.getAllDependencies(currentWorkingDirectory, coreLanguage, commandArguments, commandOptions, namespace) : this.dependencies;
    }

    /**
     * Gets the message that should be printed when help is needed for a command
     *
     * @readonly
     * @memberof Command
     */
    get helpDocs() {
        let res = [chalk.bold('Usage:'), `\t${this.usage}`];
        res.push('', this.description);
        if (this.help) res.push('', chalk.bold('Help:'), this.help);
        
        return res.join('\n');
    }

    /**
     * Extends the help docs with the given dependencies
     */
    extendHelpDocs(dependencies: IDependency[], usagePrefix?: string, helpPrefix?: string) {
        let argumentDependencies: IPromptDependency[] = dependencies.filter(_ => dependencyIsPromptDependency(_) && _.userInputType === argumentUserInputType) as IPromptDependency[];
        const usageText = argumentDependencies.map(_ => _.optional? `[--${_.name}]`: `<${_.name}>`).join(' ');
        const helpText = argumentDependencies.map(_ => `\t${_.name}: ${_.description}`).join('\n');

        this.usage = usagePrefix? `${usagePrefix} ${usageText}` : usageText;
        this.help = helpPrefix? `${helpPrefix}\n${helpText}` : helpText;
    }
}