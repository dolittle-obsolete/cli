/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from './CommandGroup';

/**
 * Represents a group of commands which must be discovered
 *
 * @export
 * @class DiscoverableCommands
 */
export abstract class DiscoverableGroup extends CommandGroup {
    
    constructor(group: string, description: string, usage: string, help?: string, shortDescription?: string) {
        super([], group, description, usage, help, shortDescription);
    }
    /**
     * Loads commands from the commands configuration file
     *
     * @memberof DiscoverableGroup
     */
    loadCommands() {
        throw new Error('Should not be implemented in the base class');
    }
}
