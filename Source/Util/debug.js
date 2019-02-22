/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import debug from 'debug';
export {default as debug} from 'debug';

let log = debug('dolittle:log');
log.log = console.log.bind(console);

export const error = debug('dolittle:error');

export default log;
