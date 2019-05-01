/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import isOnline from 'is-online';
import { Outputter } from '../Outputter';

/**
 *
 * @param {Outputter} [outputter] creates a spinner of outputter is given as argument
 * @export
 */
export default async function requireInternet(outputter) {
    let spinner = outputter? outputter.spinner().start('Checking for internet connection') : undefined;
    let online = await isOnline();
    if (!online) {
        const errorMsg = 'Not connected to the internet';
        if (spinner) spinner.fail(errorMsg);
        throw new Error(errorMsg);
    }
    if (spinner) spinner.stop();
}
