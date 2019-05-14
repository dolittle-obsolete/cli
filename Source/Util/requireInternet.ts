/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import isOnline from 'is-online';
import { Outputter } from '../Outputter';

let checkedConnection = false;
let hasInternet: boolean;

/**
 * Checks whether or not the user is connected to the internet.
 * Because only one command is run during a session of the CLI-tool, 
 * the check is only performed once and the result is stored in the session of the CLI-command.
 * 
 * @param {Outputter} [outputter] creates a spinner of outputter is given as argument
 * @throws An Error when no connection can be established 
 * @export
 */
export default async function requireInternet(outputter: Outputter) {
    if (!checkedConnection) {
        checkedConnection = true;
        let spinner = outputter? outputter.spinner().start('Checking for internet connection') : undefined;
        hasInternet = await isOnline();
        if (!hasInternet) {
            if (spinner) spinner.fail('Not connected to the internet');
            throw NotConnectedError.new;
        }
        if (spinner) spinner.stop();
    }
    else {
        if (!hasInternet) throw NotConnectedError.new;
    }
}

export class NotConnectedError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, NotConnectedError);
    }

    static get new() {
        return new NotConnectedError('Internet connection is required');
    } 
}
