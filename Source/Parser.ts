/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import minimist from 'minimist';
import { ParserResult } from './ParserResult';

/**
 * The parser of the CLI arguments.
 *
 * @export
 * @class Parser
 */
export class Parser {
    /**
     * Parses the given arguments.
     * 
     * Parsed options:
     * 
     *     [-v|--version]
     *     [-h|--help]
     *     [-d|--debug]
     *     [--coreLang] 
     *
     * @param {*} [args=process.argv]
     * @memberof Parser
     */
    parse(args = process.argv) {
        const {
            _,
            h, help, v, version, d, debug,
            coreLang,
            '--': extraArgs,
            ...extraOptions

        } = minimist(args.slice(2), {
            '--': true,
            string: ['coreLang'],
            boolean: ['h', 'help', 'v', 'version', 'd', 'debug']
        });
        const [firstArg, ...restArgs] = _;
        return new ParserResult(firstArg, restArgs, help || h, version || v, debug || d, coreLang, extraArgs || [], extraOptions);

    }
}
