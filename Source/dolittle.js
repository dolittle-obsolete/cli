#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import outputter from './Outputter';
import parser from './Parser';
import {default as log, debug} from './Util/debug';
import globals from './Globals';
import outputLatestVersion from './Actions/outputLatestVersion';

const pkg = require('../package.json');

runDolittleCli();

async function runDolittleCli() {
    let parseResult = parser.parse();
    if (!parseResult.debug)
        debug.disable();

    if (parseResult.version) {
        await printCliVersion();
        process.exit(0);
    }
    if (!hasBoilerplates()) {
        //TODO: Something
    }
    await globals.commandManager.execute(parseResult, globals.cliContext);
}

async function printCliVersion() {
    await outputLatestVersion(pkg.name, pkg.version, outputter);
}

function hasBoilerplates() {
    let boilerplatesConfigObj = globals.boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}