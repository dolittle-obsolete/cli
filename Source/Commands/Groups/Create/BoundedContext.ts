/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Create';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';

const description = `Scaffolds a Dolittle bounded context.`;
const help = [
    'The \'dolittle create boundedcontext\' command should only be used from a folder with an application.json', 
    '\t--coreLang: The language of the bounded context'
].join('\n');
const usage = 'dolittle create boundedcontext [--coreLang]';

class BoundedContext extends Command {
    
    /**
     * Creates an instance of {BoundedContext}.
     * @memberof Installed
     */
    constructor() {
        super('boundedcontext', description, usage, group,
            help, 'Scaffolds a Dolittle bounded context'
        );
    }

    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult: ParserResult, context: CliContext) {
        let projectConfigObj = context.projectConfig.store;
        let args = parserResult.getCommandArgs();
        let language = getCoreLanguage(parserResult, projectConfigObj);
        
        let boilerplates = context.boundedContextsManager.boilerplatesByLanguage(language, context.namespace);
        if (!boilerplates.length || boilerplates.length < 1) {
            context.outputter.warn(`No bounded context boilerplates found for language '${language}'${context.namespace? ' under namespace \'' + context.namespace + '\'' : ''} `);
            return;
        }
        /**
         * @type {BaseBoilerplate}
         */
        let boilerplate = null;
        if (boilerplates.length > 1)
            boilerplate = await chooseBoilerplate(boilerplates); 
        else boilerplate = boilerplates[0];

        let dependencies = seperateDependencies(
            [
                ...boilerplate.dependencies, 
                ...context.boundedContextsManager.createAdornmentDependencies(boilerplate.language, boilerplate.name, context.namespace),
                ...context.boundedContextsManager.createInteractionDependencies(boilerplate.language, boilerplate.name, context.namespace)
            ]
        );
        this.extendHelpDocs(dependencies.argument, usage, help);
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, dependencies.argument.map(_ => `Missing '${_.name}'`));

        let boilerplateContext = await resolveAllDependencies(context.managers.dependenciesManager, context.inquirer, boilerplate, context.cwd, args, dependencies);

        let boilerplatesAndDestinations = context.managers.boundedContextsManager.createBoundedContext(boilerplateContext, boilerplate, context.cwd, context.namespace);
        runCreationScripts(boilerplatesAndDestinations, (data) => context.outputter.warn(data), (data) => context.outputter.print(data), _ => {});
        
//         context.outputter.warn(`An error occured while creating bounded context.
// Make sure to initiate this command from a working directory with a application.json file.
// If there isn't a application.json file in the working directory look for information in the 'dolittle create' command group for information on how to create a dolittle application.`);
//         throw ApplicationConfigurationNotFoundError.new;
        
    }
}

export class ApplicationConfigurationNotFoundError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ApplicationConfigurationNotFoundError);
    }

    static get new() {
        return new ApplicationConfigurationNotFoundError('Missing application configuration');
    } 
}

export default new BoundedContext();