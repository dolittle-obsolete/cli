/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from '../CommandGroup';
import { Command } from '../../Command';
import { DiscoverableGroup } from '../DiscoverableGroup';

/**
 * The Create {CommandGroup}
 *
 * @export
 * @class Create
 * @extends {DiscoverableGroup}
 */
export class Create extends DiscoverableGroup {
    
    #boilerplatesManager;
    #applicationsManager;
    #boundedContextsManager;

    /**
     * Creates an instance of {Create}.
     * @memberof Create
     */
    constructor(boilerplatesManager, applicationsManager, boundedContextsManager) {
        const group = 'create';
        const help = 'Scaffolding of dolittle structures, based on boilerplates.';
        const usage = `usage: dolittle ${group} [<args>]

        Commands:
            ${commands.map( cmd => `\t$ dolittle ${group} ${cmd.name}`).join('\n')}`;
        
        super(group, help, usage);

        this.#boilerplatesManager = boilerplatesManager;
        this.#applicationsManager = applicationsManager;
        this.#boundedContextsManager = boundedContextsManager;
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