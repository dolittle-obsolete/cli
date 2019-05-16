/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate } from '@dolittle/tooling.common.boilerplates';
import { ArgumentDependencyResolver, ICanResolveDependencies } from '@dolittle/tooling.common.dependencies';
import { determineDestination } from '@dolittle/tooling.common.utilities';
import chooseTemplate from '../../../Actions/Add/chooseTemplate';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import getCoreLanguage from '../../../Util/getCoreLanguage';
import requireArguments from '../../../Util/requireArguments';
import { Command } from '../../Command';
import { MissingBoundedContextError } from './MissingBoundedContextError';

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
        super(artifactType, artifactTemplates[0].description, 'dolittle add ' + artifactType, 'add');
        this._artifactTemplates = artifactTemplates;
        this._usagePrefix = `dolittle add ${artifactType}`;
    }

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

        let dependencies = template.allDependencies;
        let argumentDependencyResolver = context.dependencyResolvers.resolvers.find(_ => _ instanceof ArgumentDependencyResolver);
        let argumentDependencies = argumentDependencyResolver? dependencies.filter(_ => (<ICanResolveDependencies>argumentDependencyResolver).canResolve(_)) : dependencies.filter(_ => _.userInputType && _.userInputType === 'argument');
        dependencies =  argumentDependencyResolver? dependencies.filter(_ => !(<ICanResolveDependencies>argumentDependencyResolver).canResolve(_)) : dependencies.filter(_ => !(_.userInputType && _.userInputType === 'argument'));
        
        this.extendHelpDocs(argumentDependencies, this._usagePrefix);
        
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        requireArguments(this, context.outputter, args, ...argumentDependencies.map(_ => `Missing '${_.name}'`));
        /**
         * @type {BoundedContext}
         */
        let boundedContext = context.boundedContextsManager.getNearestBoundedContextConfig(context.cwd);
        if (!boundedContext) throw MissingBoundedContextError.new;
        
        let boilerplateContext = await context.dependencyResolvers.resolve({}, argumentDependencies);
        let destinationAndName = determineDestination(template.area, template.boilerplate.language, boilerplateContext['name'], context.cwd, boundedContext.path, context.dolittleConfig);
        context.folders.makeFolderIfNotExists(destinationAndName.destination);
        boilerplateContext = await context.dependencyResolvers.resolve(boilerplateContext, dependencies, destinationAndName.destination, language, args);
        boilerplateContext['name'] = destinationAndName.name;
        
        
        context.artifactTemplatesManager.createArtifact(boilerplateContext, template, destinationAndName.destination);
    }
}
