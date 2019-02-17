/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../Commands/Command';
import { ParserResult } from '../ParserResult';

/**
 * Prints help based on the context and the command
 *
 * @export
 * @param {Command} command
 * @param {ParserResult} args
 * @param {import('../Commands/Command').CliContext} context
 */
export default function showHelp(command, parserResult, context) {
    context.outputter.print(command.commandDocs);
}