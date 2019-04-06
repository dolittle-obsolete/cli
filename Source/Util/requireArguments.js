/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../Commands/Command';
import { Outputter } from '../Outputter';


/**
 *
 *
 * @export
 * @param {Command} command
 * @param {Outputter} outputter
 * @param {string[]} args
 * @param {...string} argumentMessages
 */
export default function requireArguments(command, outputter, args, ...argumentMessages) {
    for (let i = 0; i < argumentMessages.length; i++) {
        let msg = argumentMessages[i];
        if (!args[i]) {
            outputter.warn(msg);
            outputter.print(command.helpDocs);
            throw new Error('Command is missing an argument');
        }
    }
}
