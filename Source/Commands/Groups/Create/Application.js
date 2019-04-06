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

//TODO: Maybe this should be a discoverable CommandGroup in the future

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
        super('application', 'Scaffolds a Dolittle application', 'dolittle create application <application name>', group,
            [
                '\tapplication name: The name of the application'
            ].join('\n'));
    }

    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        let args = [parserResult.firstArg, ...parserResult.restArgs, ...parserResult.extraArgs];
        requireArguments(this, context.outputter, args, 'Missing application name');
        let boilerplates = context.managers.applicationsManager.boilerplatesByLanguage('any');
        if (!boilerplates.length || boilerplates.length < 1) {
            context.outputter.warn('No application boilerplates found for language \'any\'');
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
        
        let boilerplateContext = await resolveAllDependencies(context.managers.dependenciesManager, context.inquirer, boilerplate, context.cwd, args, dependencies);
        context.managers.applicationsManager.createApplication(boilerplateContext, context.cwd, boilerplate);
    }
}

export default new Application();