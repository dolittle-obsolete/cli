/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Config } from './Config';
import { Cluster } from './Cluster';

/**
 * Represents a parser for {config}
 */
export class ConfigParser {
    /**
     * Parses a JSON from string into a {config} instance
     * @param {string | object} configuration String or object holding configuration
     * @returns {Config}
     */
    parse(configuration) {
        if (typeof configuration == 'undefined') configuration = {};
        if (typeof configuration == 'string') configuration = JSON.parse(configuration);

        let config = new Config();
        if (configuration.clusters) {
            configuration.clusters.forEach(cl => config.clusters.push(Object.assign(new Cluster, cl)));
        }

        config.current = config.clusters.find(cl => cl.name == configuration.current);

        return config;
    }
}
