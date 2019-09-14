/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
export function hasHelpOption(commandOptions: Map<string, string>) {
    return commandOptions.has('help') || commandOptions.has('h');
}