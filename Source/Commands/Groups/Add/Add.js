/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from '../CommandGroup';
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
        const help = 'Creates and adds a dolittle artifact to the currenent dolittle project.';
        const usage = `usage:
${commands.map( cmd => `\t$ dolittle ${group} ${cmd.name}`).join('\n')}`;
        
        super(group, help, usage);

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
