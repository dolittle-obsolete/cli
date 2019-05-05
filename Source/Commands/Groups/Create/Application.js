/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Create';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import { BaseBoilerplate } from '@dolittle/tooling.common/dist/boilerplates/BaseBoilerplate';
import chooseBoilerplate from '../../../Actions/chooseBoilerplate';
import requireArguments from '../../../Util/requireArguments';
import seperateDependencies from '../../../Util/seperateDependencies';
import resolveAllDependencies from '../../../Util/resolveAllDependencies';

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
    async action(parserResult, context) {
        let args = parserResult.commandArgs;
        const language = 'any';
        let boilerplates = context.managers.applicationsManager.boilerplatesByLanguage(language).filter(_ => _.namespace === context.namespace); //Hard coded 'any'. Maybe we will have multiple boilerplates for applications in the future?
        
        if (!boilerplates.length || boilerplates.length < 1) {
            context.outputter.warn(`No application boilerplates found for language '${language}'${context.namespace? ' under namespace \'' + context.name + '\'' : ''} `);
            return;
        }
        /**
         * @type {BaseBoilerplate}
         */
        let boilerplate = null;
        if (boilerplates.length > 1)
            boilerplate = await chooseBoilerplate(boilerplates); 
        else boilerplate = boilerplates[0];
        
        let dependencies = seperateDependencies(boilerplate.dependencies);
        this.extendHelpDocs(dependencies.argument, usage);
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, dependencies.argument.map(_ => `Missing '${_.name}'`));
        
        let boilerplateContext = await resolveAllDependencies(context.managers.dependenciesManager, context.inquirer, boilerplate, context.cwd, args, dependencies);
        context.managers.applicationsManager.createApplication(boilerplateContext, context.cwd, boilerplate);
    }
}

export default new Application();