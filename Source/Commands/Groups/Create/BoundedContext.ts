/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate, chooseBoilerplate } from '@dolittle/tooling.common.boilerplates';
import { ArgumentDependencyResolver, ICanResolveDependencies } from '@dolittle/tooling.common.dependencies';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import getCoreLanguage from '../../../Util/getCoreLanguage';
import requireArguments from '../../../Util/requireArguments';
import { runCreationScripts } from '../../../Util/runScripts';
import { Command } from '../../Command';

const description = `Scaffolds a Dolittle bounded context.`;
const help = [
    'The \'dolittle create boundedcontext\' command should only be used from a folder with an application.json', 
    '\t--coreLang: The language of the bounded context'
].join('\n');
const usage = 'dolittle create boundedcontext [--coreLang]';

export class BoundedContext extends Command {
    
    /**
     * Creates an instance of {BoundedContext}.
     * @memberof Installed
     */
    constructor() {
        super('boundedcontext', description, usage, 'create',
            help, 'Scaffolds a Dolittle bounded context'
        );
    }

    async action(parserResult: ParserResult, context: CliContext) {
        let projectConfigObj = context.projectConfig.store;
        let args = parserResult.getCommandArgs();
        let language = getCoreLanguage(parserResult, projectConfigObj);
        
        let boilerplates = context.boundedContextsManager.boilerplatesByLanguage(language, context.namespace);
        if (!boilerplates.length || boilerplates.length < 1) {
            context.outputter.warn(`No bounded context boilerplates found for language '${language}'${context.namespace? ' under namespace \'' + context.namespace + '\'' : ''} `);
            return;
        }
        let boilerplate: Boilerplate | null = null;
        if (boilerplates.length > 1) {
            do {
                boilerplate = <Boilerplate | null> await chooseBoilerplate(boilerplates, context.dependencyResolvers);
            } while(!boilerplate)

        }
        else boilerplate = boilerplates[0];

        let dependencies = [
                ...boilerplate.dependencies, 
                ...context.boundedContextsManager.createAdornmentDependencies(boilerplate.language, boilerplate.name, context.namespace),
                ...context.boundedContextsManager.createInteractionDependencies(boilerplate.language, boilerplate.name, context.namespace)
            ];
        let argumentDependencyResolver = context.dependencyResolvers.resolvers.find(_ => _ instanceof ArgumentDependencyResolver);
        let argumentDependencies = argumentDependencyResolver? dependencies.filter(_ => (<ICanResolveDependencies>argumentDependencyResolver).canResolve(_)) : dependencies.filter(_ => _.userInputType && _.userInputType === 'argument');
            

        this.extendHelpDocs(argumentDependencies, usage, help);
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, ...argumentDependencies.map(_ => `Missing '${_.name}'`));

        let boilerplateContext = await context.dependencyResolvers.resolve({}, dependencies, context.cwd, language, args);

        let boilerplatesAndDestinations = context.boundedContextsManager.createBoundedContext(boilerplateContext, <Boilerplate>boilerplate, context.cwd, context.namespace);
        runCreationScripts(boilerplatesAndDestinations, context.outputter, (data) => context.outputter.warn(data), (data) => context.outputter.print(data), _ => {});
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