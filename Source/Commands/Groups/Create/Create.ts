/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from '../CommandGroup';
import { Command } from '../../Command';
import applicationCommand from './Application';
import boundedContextCommand from './BoundedContext';

export const group = 'create';

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
        super(commands, group, description,
            `dolittle ${group} <command>`, '', 'Commands related to scaffolding Dolittle appliation structures', 
        );
    }
}

export default new Create([applicationCommand, boundedContextCommand]);