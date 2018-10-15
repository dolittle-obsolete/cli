/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a globally unique identifier
 */
export class Guid {

    /**
     * Get the empty representation
     */
    static get empty() {
        return '00000000-0000-0000-0000-000000000000';
    }

    /**
     * Create a new {Guid} as {string}
     * @returns {string} String representation of {Guid}
     */
    static create() {
        let S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        let guid = (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
        return guid;
    }
}
