#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import fs from 'fs';
import inquirer from 'inquirer';
import askForCoreLanguage from './Actions/askForCoreLanguage';
import { askToDownloadOrUpdateBoilerplates } from './Actions/Boilerplates/downloadOrUpdateBoilerplates';
import dolittleBoilerplates from './Actions/Boilerplates/fetchDolittleBoilerplates';
import globals from './Globals';
import outputter from './Outputter';
import parser from './Parser';
import { debug } from './Util/debug';

const pkg = require('../package.json');

runDolittleCli();

async function runDolittleCli() {
    
    let parseResult = parser.parse();
    if (!parseResult.debug)
        debug.disable();

    if (parseResult.version) {
        printCliVersion();
        process.exit(0);
    }
    if (!hasProjectConfiguration()) {
        let coreLanguage;
        while (!coreLanguage) coreLanguage = await askForCoreLanguage();

        globals.cliContext.projectConfig.store = {coreLanguage};
    }
    if (!hasBoilerplates()) {
        let boilerplatePaths = globals.cliContext.boilerplateDiscoverers.boilerplatePaths;
        if (boilerplatePaths.length > 0) globals.cliContext.boilerplateDiscoverers.discover();
        else {
            let boilerplatePackages = [];
            let shouldDownload = await askToFindBoilerplates();
            if (shouldDownload) {
                boilerplatePackages = await dolittleBoilerplates(globals.cliContext.onlineBoilerplateDiscoverer, outputter);
                await askToDownloadOrUpdateBoilerplates(boilerplatePackages, globals.cliContext.boilerplateDiscoverers, outputter);
            }
        }
    }
    
    await globals.commandManager.execute(parseResult, globals.cliContext);
}
async function askToFindBoilerplates() {
    let answers: any = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'No boilerplates matching the tooling version was found on your system.\nDo you want to find Dolittle\'s boilerplates?'}]);   
    return answers['download'];
}
function printCliVersion() {
    outputter.print(`${pkg.name} v${pkg.version}`);
}

function hasBoilerplates() {
    let boilerplatesConfigObj = globals.cliContext.boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}
function hasProjectConfiguration() {
    let projectConfigObj = globals.cliContext.projectConfig;
    return fs.existsSync(projectConfigObj.path);
}