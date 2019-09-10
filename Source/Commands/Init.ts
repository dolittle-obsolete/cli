/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { Command } from './Command';
import { Outputter } from '../Outputter';
import { BusyIndicator } from '../BusyIndicator';
import hasHelpOption from '../Util/hasHelpOption';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';

const description = `<To be implemented> Initializes the Dolittle CLI by choosing a deafult core language and a default namespace.

'dolittle init' should also be used to set new defaults`;
const help = [
    '\t--namespace: <To be implemented>',
    '\t--coreLanguage: The default core language'

].join('\n');
export class Init extends Command {
    constructor() {
        super('init', description, 
            'dolittle init [-n | --namespace] [-c | --coreLanguage]', undefined, help, 'Initializes the Dolittle CLI');
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        if (hasHelpOption(commandOptions)) {
            outputter.print(this.helpDocs);
            return;
        }
    }
    getAllDependencies(currentWorkingDirectory: string, coreLanguage: string, commandArguments?: string[] | undefined, commandOptions?: Map<string, string> | undefined, namespace?: string | undefined): import("@dolittle/tooling.common.dependencies").IDependency[] {
        throw new Error("Method not implemented.");
    }
}