/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { config } from './config';
import {  cluster } from './cluster';

/**
 * Represents a parser for {config}
 */
export class configParser {
    /**
     * Parses a JSON from string into a {config} instance
     * @param {string | object} configuration String or object holding configuration
     * @returns {config}
     */
    parse(configuration) {
        if (typeof configuration == 'undefined') configuration = {};
        if (typeof configuration == 'string') configuration = JSON.parse(configuration);

        let c = new config();
        if (configuration.clusters) {
            configuration.clusters.forEach(cl => c.clusters.push(Object.assign(new cluster, cl)));
        }

        c.current = c.clusters.find(cl => cl.name == configuration.current);

        return c;
    }
}
