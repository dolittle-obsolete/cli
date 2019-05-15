/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Boilerplate } from '@dolittle/tooling.common.boilerplates';
import { ArgumentDependencyResolver, ICanResolveDependencies } from '@dolittle/tooling.common.dependencies';
import chooseBoilerplate from '../../../Actions/chooseBoilerplate';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import requireArguments from '../../../Util/requireArguments';
import { Command } from '../../Command';
import { group } from './Create';

const description = `Scaffolds a Dolittle application`;

const usage = 'dolittle create application';
/**
 * NOTE: Application is kinda hardcoded right now. Need to come up with a system for this later on, it must behave like a discoverable group in the future
 *
 * @class Application
 * @extends {Command}
 */
class Application extends Command {
    /**
     * Creates an instance of {Check}.
     * @memberof Installed
     */
    constructor() {
        super('application', description, usage, group,
            '', 'Scaffolds a Dolittle application');
    }

    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult: ParserResult, context: CliContext) {
        let args = parserResult.getCommandArgs();
        const language = 'any';
        let boilerplates = context.applicationsManager.boilerplatesByLanguage(language, context.namespace);
        
        if (!boilerplates.length || boilerplates.length < 1) {
            context.outputter.warn(`No application boilerplates found for language '${language}'${context.namespace? ' under namespace \'' + context.namespace + '\'' : ''} `);
            return;
        }
        /**
         * @type {BaseBoilerplate}
         */
        let boilerplate = null;
        if (boilerplates.length > 1) {
            do{
                boilerplate = await chooseBoilerplate(boilerplates); 
            }while(!boilerplate)
        }
        else boilerplate = boilerplates[0];
        
        let dependencies = boilerplate.dependencies;
        let argumentDependencyResolver = context.dependencyResolvers.resolvers.find(_ => _ instanceof ArgumentDependencyResolver);
        let argumentDependencies = argumentDependencyResolver? dependencies.filter(_ => (<ICanResolveDependencies>argumentDependencyResolver).canResolve(_)) : dependencies.filter(_ => _.userInputType && _.userInputType === 'argument');
        
        this.extendHelpDocs(argumentDependencies, usage);

        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, ...argumentDependencies.map(_ => `Missing '${_.name}'`));
        
        let boilerplateContext = await context.dependencyResolvers.resolve({}, dependencies, context.cwd, language, args)
        context.applicationsManager.createApplication(boilerplateContext, context.cwd, <Boilerplate>boilerplate);
    }
}

export default new Application();