#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import outputter from './Outputter';
import parser from './Parser';
import debug from './debug';
import { getLatestVersion, isCompatibleUpgrade, isGreaterVersion } from './Util/packageVersion';
import chalk from 'chalk';
import globals from './Globals';
const pkg = require('../package.json');

runDolittleCli();

// TODO: Namespace, -n, --namespace 'dolittle, veracity, ...'

async function runDolittleCli() {
    
    let parseResult = parser.parse();
    outputter.print(parseResult);

    if (parseResult.version) {
        const current = pkg.version;
        const latest = await getLatestVersion(pkg.name);
        const text = 'Dolittle CLI';
        let textPostfix = ` v${current}\n`;
        
        if (isCompatibleUpgrade(latest, current)) textPostfix = chalk.yellow(textPostfix);
        else if (isGreaterVersion(latest, current)) textPostfix = chalk.red(textPostfix);
        else textPostfix = chalk.green(textPostfix);
        
        outputter.print(text + textPostfix);
    }

}

export function getHelpDocs() {
    const res = [
        `usage: dolittle${commandGroup} <command> [<args>] [-v|--version] [-d|--debug] [-h|--help]`
    ];
}