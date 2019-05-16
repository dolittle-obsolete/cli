/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { CommandGroup } from '../CommandGroup';
import { Check } from './Check';
import { Dolittle } from './Dolittle';
import { Init } from './Init';
import { Installed } from './Installed';
import { List } from './List';
import { Online } from './Online';

/**
 * The Boilerplates {CommandGroup}
 *
 * @export
 * @class Boilerplates
 * @extends {CommandGroup}
 */
class Boilerplates extends CommandGroup {
    /**
     * Creates an instance of {Boilerlates}.
     * @param {Command[]} commands
     * @memberof Boilerplates
     */
    constructor(commands: Command[]) {
        super(commands, 'boilerplates', 
            'Commands related to boilerplates.',
            `dolittle boilerplates <command>`
        );
    }
}

export default new Boilerplates([
    new Check(), new Dolittle(), new Init(), new Installed(), new List(), new Online()
]);