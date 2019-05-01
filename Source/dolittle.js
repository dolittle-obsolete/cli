#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import fs from 'fs';
import inquirer from 'inquirer';
import outputter from './Outputter';
import parser from './Parser';
import {default as log, debug} from './Util/debug';
import globals from './Globals';
import outputLatestVersion from './Actions/outputLatestVersion';
import dolittleBoilerplates from './Actions/Boilerplates/fetchDolittleBoilerplates';
import {askToDownloadOrUpdateBoilerplates} from './Actions/Boilerplates/downloadOrUpdateBoilerplates';
import askForCoreLanguage from './Actions/askForCoreLanguage';

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
        let boilerplates = globals.boilerplatesManager.installedBoilerplatePaths;
        if (boilerplates.length > 0) globals.boilerplatesManager.discoverInstalledBoilerplates();
        else {
            let shouldDownload = await askToFindBoilerplates();
            if (shouldDownload) {
                boilerplates = await dolittleBoilerplates(globals.boilerplatesManager, outputter);
                await askToDownloadOrUpdateBoilerplates(boilerplates, globals.boilerplatesManager, outputter);
            }
        }
    }
    if (!hasProjectConfiguration()) {
        let coreLanguage;
        while (!coreLanguage) coreLanguage = await askForCoreLanguage();

        globals.projectConfig.store = {coreLanguage};
    }
    await globals.commandManager.execute(parseResult, globals.cliContext);
}
async function askToFindBoilerplates() {
    let answers = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'No boilerplates matching the tooling version was found on your system.\nDo you want to find Dolittle\'s boilerplates?'}]);   
    return answers['download'];
}
async function printCliVersion() {
    try {
        await outputLatestVersion(pkg.name, pkg.version, outputter);
    } catch(error) {
        outputter.print(`${pkg.name} v${pkg.version}`);
    }
}

function hasBoilerplates() {
    let boilerplatesConfigObj = globals.boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}
function hasProjectConfiguration() {
    let projectConfigObj = globals.projectConfig;
    return fs.existsSync(projectConfigObj.path);
}