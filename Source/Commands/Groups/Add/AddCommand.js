/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Add';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import { ArtifactTemplate } from '@dolittle/tooling.common/dist/artifacts/ArtifactTemplate';
import seperateDependencies from '../../../Util/seperateDependencies';
import requireArguments from '../../../Util/requireArguments';
import resolveAllDependencies from '../../../Util/resolveAllDependencies';
import chooseTemplate from '../../../Actions/Add/chooseTemplate';

export class AddCommand extends Command {
    #_artifactTemplates;
    /**
     * Creates an instance of {AddCommand}.
     * @param {string} artifactType
     * @param {ArtifactTemplate[]} artifactTemplates
     * @memberof Installed
     */
    constructor(artifactType, artifactTemplates) {
        super(artifactType, artifactTemplates[0].description, 'dolittle add ' + artifactType, group);
        this.#_artifactTemplates = artifactTemplates;
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
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
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

        let args = [parserResult.firstArg, ...parserResult.restArgs, ...parserResult.extraArgs];
        requireArguments(this, context.outputter, args, 'Missing artifact name');

        let template = templatesWithLanguage[0];

        if (templatesWithLanguage.length > 1) template = await chooseTemplate(); 

        let dependencies = seperateDependencies(template.allDependencies());
        let boilerplateContext = await resolveAllDependencies(context.managers.dependenciesManager, context.inquirer, template.boilerplate, context.cwd, args, dependencies);
        context.managers.artifactsManager.createArtifact(boilerplateContext, template, context.cwd);
    }
}
