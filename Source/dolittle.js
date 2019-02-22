#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import outputter from './Outputter';
import parser from './Parser';
import log, {debug} from './Util/debug';
import { getLatestVersion, isCompatibleUpgrade, isGreaterVersion } from './Util/packageVersion';
import chalk from 'chalk';
import globals from './Globals';
import dolittleBoilerplates from './Actions/fetchDolittleBoilerplates';

const pkg = require('../package.json');

runDolittleCli();

// TODO: Namespace, -n, --namespace 'dolittle, veracity, ...'

async function runDolittleCli() {
    let parseResult = parser.parse();
    
    if (!parseResult.debug)
        debug.disable();
    
    log(parseResult);

    if (parseResult.version) {
        await printCliVersion();
        process.exit(0);
    }
    if (!hasBoilerplates()) {
        let boilerplates = await dolittleBoilerplates(globals.boilerplatesManager, outputter);
        outputter.print(boilerplates.map(_ => _.name));
    }

}

async function printCliVersion() {
    const current = pkg.version;
    const latest = await getLatestVersion(pkg.name);
    const text = 'Dolittle CLI';
    let textPostfix = ` v${current}\n`;
    
    if (isCompatibleUpgrade(latest, current)) textPostfix = chalk.yellow(textPostfix);
    else if (isGreaterVersion(latest, current)) textPostfix = chalk.red(textPostfix);
    else textPostfix = chalk.green(textPostfix);
    
    outputter.print(text + textPostfix);
}

function hasBoilerplates() {
    let boilerplatesConfigObj = globals.boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}
export function getHelpDocs() {
    const res = [
        `usage: dolittle${commandGroup} <command> [<args>] [-v|--version] [-d|--debug] [-h|--help]`
    ];
}