/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Add';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import { ArtifactTemplate } from '@dolittle/tooling.common/dist/artifacts/ArtifactTemplate';
import {Dependency} from '@dolittle/tooling.common/dist/dependencies/Dependency';
import seperateDependencies from '../../../Util/seperateDependencies';
import requireArguments from '../../../Util/requireArguments';
import resolveAllDependencies from '../../../Util/resolveAllDependencies';
import chooseTemplate from '../../../Actions/Add/chooseTemplate';
import { helpers } from '@dolittle/tooling.common';
import { MissingBoundedContextError } from './MissingBoundedContextError';
import { BoundedContext } from '@dolittle/tooling.common/dist/boundedContexts/BoundedContext';
import resolveArgumentDependencies from '../../../Util/resolveArgumentDependencies';
import resolveNonPromptDependencies from '../../../Util/resolveNonPromptDependencies';
import resolvePromptDependencies from '../../../Util/resolvePromptDependencies';

export class AddCommand extends Command {
    #_artifactTemplates;
    #_usagePrefix;
    /**
     * Creates an instance of {AddCommand}.
     * @param {string} artifactType
     * @param {ArtifactTemplate[]} artifactTemplates
     * @memberof Installed
     */
    constructor(artifactType, artifactTemplates) {
        super(artifactType, artifactTemplates[0].description, 'dolittle add ' + artifactType, group);
        this.#_artifactTemplates = artifactTemplates;
        this.#_usagePrefix = 'dolittle add ' + artifactType;
    }
    /**
     * 
     * @type {ArtifactTemplate[]}
     * @readonly
     * @memberof AddCommand
     */
    get artifactTemplates() {
        return this.#_artifactTemplates;
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        
        let projectConfigObj = context.projectConfig.store;
        let language = projectConfigObj.coreLanguage;
        /**
         * @type {ArtifactTemplate[]}
         */
        let templatesWithLanguage = this.artifactTemplates.filter(_ => _.boilerplate.language === language);

        if (!templatesWithLanguage.length || templatesWithLanguage.length < 1) {
            context.outputter.warn(`There are no artifact templates of type '${this.name}' with language '${language}'.`);
            return;
        }

        let args = [parserResult.firstArg, ...parserResult.restArgs, ...parserResult.extraArgs].filter(_ => _ !== undefined);
        
        let template = templatesWithLanguage[0];

        if (templatesWithLanguage.length > 1) template = await chooseTemplate(templatesWithLanguage); 

        let dependencies = seperateDependencies(template.allDependencies());
        this.#extendHelpDocs(dependencies.argument);
        
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, dependencies.argument.map(_ => `Missing '${_.name}'`));
        /**
         * @type {BoundedContext}
         */
        let boundedContext = context.managers.boundedContextsManager.getNearestBoundedContextConfig(context.cwd);
        if (!boundedContext) throw MissingBoundedContextError.new;

        let boilerplateContext = resolveArgumentDependencies(args, dependencies.argument, {});
        let destinationAndName = helpers.determineDestination(template.area, template.boilerplate.language, boilerplateContext['name'], context.cwd, boundedContext.path, context.dolittleConfig);
        boilerplateContext['name'] = destinationAndName.name;
        context.folders.makeFolderIfNotExists(destinationAndName.destination);
        
        boilerplateContext = resolveNonPromptDependencies(context.managers.dependenciesManager, dependencies.nonPrompt, destinationAndName.destination, template.boilerplate.language, boilerplateContext);
        boilerplateContext = await resolvePromptDependencies(context.inquirer, dependencies.prompt, destinationAndName.destination, template.boilerplate.language, boilerplateContext);
        
        context.managers.artifactsManager.createArtifact(boilerplateContext, template, destinationAndName.destination);
    }
    /**
     * Extends the help docs for the particular command with the given dependencies
     * @param {Dependency[]} argumentDependencies
     */
    #extendHelpDocs(argumentDependencies) {
        this.usage = `${this.#_usagePrefix} ${argumentDependencies.map(_ => _.name).join(' ')}`;
        this.help = argumentDependencies.map(_ => `\t${_.name}: ${_.description}`).join('\n');
    }
}
