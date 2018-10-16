/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Cluster } from './Cluster';

export class Config
{
    /**
     * Array of all the configured clusters
     * @type {Cluster[]}
     */
    clusters = []

    /**
     * Current cluster being used
     * @type {Cluster}
     */
    current = null
}
