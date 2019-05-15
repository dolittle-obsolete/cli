/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate, IArtifactTemplatesManager } from '@dolittle/tooling.common.boilerplates';
import { groupBy } from '@dolittle/tooling.common.utilities';
import { DiscoverableGroup } from '../DiscoverableGroup';
import { AddCommand } from './AddCommand';

export const group = 'add';

const description = `Adds basic building blocks to an existing bounded context.

What can be added to a bounded context is based on the boilerplates available on the local system.

Use 'dolittle boilerplates dolittle' to download boilerplates that Dolittle has made available.
Or use 'dolittle boilerplates online' do download boilerplates made available by others including Dolittle.
`;
const usage = `dolittle ${group} <command>`;
/**
 * The Add {CommandGroup}
 *
 * @export
 * @class Add
 * @extends {DiscoverableGroup}
 */
export class Add extends DiscoverableGroup {

    private _artifactTemplatesManager: IArtifactTemplatesManager;

    /**
     * Creates an instance of {Add}.
     * @memberof Add
     */
    constructor(artifactTemplatesManager: IArtifactTemplatesManager) {
        super(group, description, usage, 'The \'dolittle add\' command should only be used within a bounded context folder', 'Adds basic building blocks to an existing bounded context', );

        this._artifactTemplatesManager = artifactTemplatesManager;
    }
    /**
     * @inheritdoc
     * @memberof Add
     */
    loadCommands() {
        let artifactsBoilerplates = this._artifactTemplatesManager.boilerplates;
        
        let artifactTemplates: ArtifactTemplate[] = [];
        artifactsBoilerplates.forEach(_ => artifactTemplates.push(..._.artifactTemplates));
        let artifactTemplateGroup = groupBy('type')(artifactTemplates);
        Object.keys(artifactTemplateGroup)
            .forEach(type => {
                let templates: ArtifactTemplate[] = artifactTemplateGroup[type];
                this.commands.push(new AddCommand(type, templates));
            });
    }
}