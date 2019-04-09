/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Add';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import { ArtifactTemplate } from '@dolittle/tooling.common/dist/artifacts/ArtifactTemplate';

export class AddCommand extends Command {
    #_artifactTemplates;
    /**
     * Creates an instance of {AddCommand}.
     * @param {string} artifactType
     * @param {ArtifactTemplate[]} artifactTemplates
     * @memberof Installed
     */
    constructor(artifactType, artifactTemplates) {
        super(artifactType, 'Something', 'something', group);
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
        
    }
}
