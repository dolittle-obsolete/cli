/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { cluster } from './cluster';

export class config
{
    /**
     * Array of all the configured clusters
     * @type cluster[]
     */
    clusters = []

    /**
     * Current cluster being used
     */
    current = null
}
