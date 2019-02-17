#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import outputter from './Outputter';
import parser from './Parser';

runDolittleCli();

async function runDolittleCli() {
    let parseResult = parser.parse();
    outputter.print(parseResult);
}