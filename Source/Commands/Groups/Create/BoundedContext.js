/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Create';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import { BaseBoilerplate } from '@dolittle/tooling.common/dist/boilerplates/BaseBoilerplate';
import requireArguments from '../../../Util/requireArguments';
import chooseBoilerplate from '../../../Actions/chooseBoilerplate';
import seperateDependencies from '../../../Util/seperateDependencies';
import resolveAllDependencies from '../../../Util/resolveAllDependencies';
import getCoreLanguage from '../../../Util/getCoreLanguage';

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
    async action(parserResult, context) {
        let projectConfigObj = context.projectConfig.store;
        let args = parserResult.commandArgs;
        let language = getCoreLanguage(parserResult, projectConfigObj);
        
        let boilerplates = context.managers.boundedContextsManager.boilerplatesByLanguage(language);
        if (!boilerplates.length || boilerplates.length < 1) {
            context.outputter.warn(`No bounded context boilerplates found for language '${language}'`);
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
            [...boilerplate.dependencies, 
                ...context.managers.boundedContextsManager.createInteractionDependencies(boilerplate.language, boilerplate.name)
            ]
        );
        this.extendHelpDocs(dependencies.argument, usage, help);
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, dependencies.argument.map(_ => `Missing '${_.name}'`));

        let boilerplateContext = await resolveAllDependencies(context.managers.dependenciesManager, context.inquirer, boilerplate, context.cwd, args, dependencies);

        try {
            context.managers.boundedContextsManager.createBoundedContext(boilerplateContext, boilerplate, context.cwd);
        } catch (error) {
            context.outputter.warn(`An error occured while creating bounded context.
Make sure to initiate this command from a working directory with a application.json file.
If there isn't a application.json file in the working directory look for information in the 'dolittle create' command group for information on how to create a dolittle application.`);
            throw error;
        }
    }
}

export default new BoundedContext();