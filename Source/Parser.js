/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import minimist from 'minimist';
import { ParserResult } from './ParserResult';

export class Parser {
    parse(args = process.argv) {
        const {
            _,
            help, version, debug,
            coreLang,
            '--': extraArgs,
            ...extraOptions

        } = minimist(args, {
            '--': true,
            string: ['coreLang'],
            alias: {v: 'version', h: 'help', d: 'debug'}
        });
        const [firstArg, ...restArgs] = _;
        return new ParserResult(firstArg, restArgs, help, version, debug, coreLang, extraArgs, extraOptions)

    }
}

export default new Parser();