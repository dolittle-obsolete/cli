/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../Commands/Command';
import { Outputter } from '../Outputter';

/**
 * Checks whether or not there are missing arguments for a command. 
 * 
 * @export
 * @param {Command} command The command that is executed
 * @param {Outputter} outputter The outputter for printing
 * @param {string[]} args The given arguments. 
 * @param {...string} argumentMessages A list of error messages for when a required argument is missing.
 */
export default function requireArguments(command: Command, outputter: Outputter, args: string[], ...argumentMessages: string[]) {
    for (let i = 0; i < argumentMessages.length; i++) {
        let msg = argumentMessages[i];
        if (!args[i]) {
            outputter.warn(msg);
            outputter.print(command.helpDocs);
            throw MissingCommandArgumentError.new;
        }
    }
}

export class MissingCommandArgumentError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MissingCommandArgumentError);
    }

    static get new() {
        return new MissingCommandArgumentError('Missing a required argument');
    } 
}