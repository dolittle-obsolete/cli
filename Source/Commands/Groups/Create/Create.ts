/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { CommandGroup } from '../CommandGroup';
import { Application } from './Application';
import { BoundedContext } from './BoundedContext';

const description = `Commands related to scaffolding Dolittle appliation structures.

Quickly get up and running by scaffolding bounded context and application skeletons.`;
/**
 * The Create {CommandGroup}
 *
 * @export
 * @class Create
 * @extends {CommandGroup}
 */
class Create extends CommandGroup {
    /**
     * Creates an instance of {Create}.
     * @param {Command[]} commands
     * @memberof Create
     */
    constructor(commands: Command[]) {
        super(commands, 'create', description,
            `dolittle create <command>`, '', 'Commands related to scaffolding Dolittle appliation structures', 
        );
    }
}

export default new Create([
    new Application(), new BoundedContext()
]);