/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Command as BaseCommand, ICommand, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IDependency, dependencyIsPromptDependency, argumentUserInputType, IPromptDependency, IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { IBusyIndicator, ICanOutputMessages, Exception } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { ParserResult, FailedCommandOutputter } from '../index';

/**
 * The base class of a {Command} that is wrapped to fit the needs of the CLI. 
 *
 * @export
 * @class Command
 */
export class Command extends BaseCommand {
    
    static fromCommand(command: ICommand, commandGroup?: string, namespace?: string) {
        const usage = `dolittle${namespace? ' ' + namespace : ''}${commandGroup? ' ' + commandGroup : ''} ${command.name}`;
        return new Command(command.name, command.description, usage, commandGroup, undefined, command.shortDescription, command);
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
     * Creates an instance of {Command}.
     * @param {string} name
     * @param {string} description
     * @param {string} usage
     * @param {string?} group
     * @param {string?} help
     * @memberof Command
     */
    constructor(name: string, description: string, usage: string, group?: string, help?: string, shortDescription?: string, private _derivedCommand?: ICommand) {
        super(name, description, false, shortDescription)
        this.usage = usage;
        this.group = group;
        this.help = help;
    }

    async trigger(parserResult: ParserResult, commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        if (!this._derivedCommand) throw new Exception('Something unexpected happened. A bad command.');
        if (parserResult.help) {
            outputter.print(this.helpDoc);
            return;
        }
        await this.onAction(commandContext, dependencyResolvers, new FailedCommandOutputter(this, outputter), outputter, busyIndicator)
        
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        if (!this._derivedCommand) throw new Exception('Something unexpected happened. A bad command.');
        try {
            await this._derivedCommand.action(commandContext, dependencyResolvers,failedCommandOutputter, outputter, busyIndicator);    
        }
        catch {

        }
    }

    get helpDoc() {
        if (this._derivedCommand) {
            this.extendHelpDocs(this._derivedCommand.dependencies)
            let res = [chalk.bold('Usage:'), `\t${this.usage}`];
            res.push('', this.description);
            if (this.help) res.push('', chalk.bold('Help:'), this.help);
            
            return res.join('\n');
        }
        return '';
    }

    /**
     * Extends the help docs with the given dependencies
     */
    private extendHelpDocs(dependencies: IDependency[]) {
        let argumentDependencies: IPromptDependency[] = dependencies.filter(_ => dependencyIsPromptDependency(_) && _.userInputType === argumentUserInputType) as IPromptDependency[];
        const usageText = argumentDependencies.map(_ => _.optional? `[--${_.name}]`: `<${_.name}>`).join(' ');
        const helpText = argumentDependencies.map(_ => `\t${_.name}: ${_.description}`).join('\n');

        this.usage = `${this.usage} ${usageText}`;
        this.help = this.help? `${this.help}\n${helpText}` : helpText;
    }
    
}