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
        super('', '', '');
        this.#boilerplatesManager = boilerplatesManager;
        this.#artifactsManager = artifactsManager;

        this.group = 'add';
        this.help = 'Creates and adds a dolittle artifact to the current dolittle project.';
        this.usage = 
`usage: dolittle [<namespace>] add <sub-command> 

    Sub commands:
        ${this.commands.map(cmd => cmd.helpDocs).join('\n\t\t')}`;
        
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
