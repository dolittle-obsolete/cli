/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DiscoverableGroup } from '../DiscoverableGroup';
import { BoilerplatesManager } from '@dolittle/tooling.common/dist/boilerplates/BoilerplatesManager';
import { artifactsBoilerplateType } from '@dolittle/tooling.common/dist/artifacts/ArtifactsManager';
import { ArtifactsBoilerplate } from '@dolittle/tooling.common/dist/boilerplates/ArtifactsBoilerplate';
import { ArtifactTemplate } from '@dolittle/tooling.common/dist/artifacts/ArtifactTemplate';
import { groupBy } from '@dolittle/tooling.common/dist/helpers';
import { AddCommand } from './AddCommand';

export const commandsConfigurationField = 'add';
export const group = 'add';

const description = 'Adds artifacts and other building blocks to an existing bounded context.';
const usage = `dolittle ${group} [<sub-command>]`;
/**
 * The Add {CommandGroup}
 *
 * @export
 * @class Add
 * @extends {DiscoverableGroup}
 */
export class Add extends DiscoverableGroup {

    #_boilerplatesManager;
    #_artifactsManager;

    /**
     * Creates an instance of {Add}.
     * @memberof Add
     */
    constructor(boilerplatesManager, artifactsManager) {
        super(group, description, usage);

        this.#_boilerplatesManager = boilerplatesManager;
        this.#_artifactsManager = artifactsManager;
    }
    /**
     * Gets the boilerplates manager
     *
     * @type {BoilerplatesManager}
     * @readonly
     * @memberof Add
     */
    get boilerplatesManager() {
        return this.#_boilerplatesManager;
    }
    /**
     * Gets the artifacts manager
     *
     * @type {ArtifactsManager}
     * @readonly
     * @memberof Add
     */
    get artifactsManager() {
        return this.#_artifactsManager;
    }
    /**
     * @inheritdoc
     * @memberof Add
     */
    loadCommands() {
         /**
         * @type {ArtifactsBoilerplate[]}
         */
        let artifactsBoilerplates = this.boilerplatesManager.boilerplatesByType(artifactsBoilerplateType);
        /**
         * @type {ArtifactTemplate[]}
         */
        let artifactTemplates = [];
        artifactsBoilerplates.forEach(_ => artifactTemplates.push(..._.artifactTemplates));
        let artifactTemplateGroup = groupBy('type')(artifactTemplates);
        Object.keys(artifactTemplateGroup)
            .forEach(type => {
                /**
                 * @type {ArtifactTemplate[]}
                 */
                let templates = artifactTemplateGroup[type];
                this.commands.push(new AddCommand(type, templates));
            });
    }
}