/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { DiscoverableGroup } from '../DiscoverableGroup';


/**
 * The Add {CommandGroup}
 *
 * @export
 * @class Add
 * @extends {DiscoverableGroup}
 */
export class Add extends DiscoverableGroup {

    #boilerplatesManager;
    #artifactsManager;
    /**
     * Creates an instance of {}.
     * @memberof Add
     */
    constructor(boilerplatesManager, artifactsManager) {
        const group = 'add';
        const description = 'Adds artifacts and other building blocks to an existing bounded context.';
        const usage = `dolittle ${group} [<sub-command>]`;
        super(group, description, usage);

        this.#boilerplatesManager = boilerplatesManager;
        this.#artifactsManager = artifactsManager;

    }

    /**
     * @inheritdoc
     * @returns {Command[]} The discovered commands
     * @memberof DiscoverableCommands
     */
    async discover() {
        throw new Error('Should not be implemented in the base class');
    }
}
