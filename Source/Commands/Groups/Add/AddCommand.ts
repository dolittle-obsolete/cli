/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Add';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import { ArtifactTemplate } from '@dolittle/tooling.common.boilerplates';

export class AddCommand extends Command {
    private _artifactTemplates: ArtifactTemplate[];
    private _usagePrefix: string;
    /**
     * Creates an instance of {AddCommand}.
     * @param {string} artifactType
     * @param {ArtifactTemplate[]} artifactTemplates
     * @memberof Installed
     */
    constructor(artifactType: string, artifactTemplates: ArtifactTemplate[]) {
        if (!artifactTemplates || artifactTemplates.length === 0) throw new Error('No artifact templates given to add command');
        super(artifactType, artifactTemplates[0].description, 'dolittle add ' + artifactType, group);
        this._artifactTemplates = artifactTemplates;
        this._usagePrefix = `dolittle add ${artifactType}`;
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult: ParserResult, context: CliContext ) {
        let projectConfigObj = context.projectConfig.store;
        let language = getCoreLanguage(parserResult, projectConfigObj);
        
        /**
         * @type {ArtifactTemplate[]}
         */
        let templatesWithLanguage = this._artifactTemplates.filter(_ => _.boilerplate.namespace === context.namespace && _.boilerplate.language === language);

        if (!templatesWithLanguage.length || templatesWithLanguage.length < 1) {
            context.outputter.warn(`There are no artifact templates of type '${this.name}' with language '${language}'${context.namespace? ' under namespace \'' + context.namespace + '\'' : ''}`);
            return;
        }

        let args = parserResult.getCommandArgs();
        
        let template = templatesWithLanguage[0];

        if (templatesWithLanguage.length > 1) template = await chooseTemplate(templatesWithLanguage); 

        let dependencies = seperateDependencies(template.allDependencies());
        this.extendHelpDocs(dependencies.argument, this.#_usagePrefix);
        
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, dependencies.argument.map(_ => `Missing '${_.name}'`));
        /**
         * @type {BoundedContext}
         */
        let boundedContext = context.boundedContextsManager.getNearestBoundedContextConfig(context.cwd);
        if (!boundedContext) throw MissingBoundedContextError.new;

        let boilerplateContext = resolveArgumentDependencies(args, dependencies.argument, {});
        let destinationAndName = helpers.determineDestination(template.area, template.boilerplate.language, boilerplateContext['name'], context.cwd, boundedContext.path, context.dolittleConfig);
        boilerplateContext['name'] = destinationAndName.name;
        context.folders.makeFolderIfNotExists(destinationAndName.destination);
        
        boilerplateContext = resolveNonPromptDependencies(context.managers.dependenciesManager, dependencies.nonPrompt, destinationAndName.destination, template.boilerplate.language, boilerplateContext);
        boilerplateContext = await resolvePromptDependencies(context.inquirer, dependencies.prompt, destinationAndName.destination, template.boilerplate.language, boilerplateContext);
        
        context.managers.artifactsManager.createArtifact(boilerplateContext, template, destinationAndName.destination);
    }
}
