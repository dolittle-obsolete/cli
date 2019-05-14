/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

export class MissingBoundedContextError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MissingBoundedContextError);
    }

    static get new() {
        return new MissingBoundedContextError('Could not find bounded context');
    } 
}