#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { askToDownloadOrUpdateBoilerplates, fetchDolittleBoilerplates, BoilerplatePackageInfo, projectConfig, boilerplateDiscoverers, onlineDolittleBoilerplatesFinder, boilerplatesConfig } from "@dolittle/tooling.common.boilerplates";
import '@dolittle/tooling.common.plugins';
import fs from 'fs';
import inquirer from 'inquirer';
import askForCoreLanguage from './askForCoreLanguage';
import globals from './Globals';
import { BusyIndicator } from "./BusyIndicator";
import { Outputter } from "./Outputter";
import { dependencyResolvers } from "@dolittle/tooling.common.dependencies";

const pkg = require('../package.json');
const outputter = new Outputter();
const busyIndicator = new BusyIndicator();
runDolittleCli();

async function runDolittleCli() {

    let parseResult = globals.parser.parse();

    if (parseResult.version) {
        printCliVersion();
        process.exit(0);
    }
    if (!hasProjectConfiguration()) {
        let coreLanguage;
        while (!coreLanguage) coreLanguage = await askForCoreLanguage();

        projectConfig.store = {coreLanguage};
    }
    if (!hasBoilerplates()) {
        let boilerplatePaths = boilerplateDiscoverers.boilerplatePaths;
        if (boilerplatePaths.length > 0) boilerplateDiscoverers.discover();
        else {
            let boilerplatePackages = [];
            let shouldDownload = await askToFindBoilerplates();
            if (shouldDownload) {
                boilerplatePackages = await fetchDolittleBoilerplates(onlineDolittleBoilerplatesFinder, busyIndicator);
                await askToDownloadOrUpdateBoilerplates(boilerplatePackages as BoilerplatePackageInfo[], boilerplateDiscoverers, dependencyResolvers, busyIndicator);
            }
        }
    }
    
    await globals.cliCommandManager.execute(parseResult, projectConfig, outputter);
}
async function askToFindBoilerplates() {
    let answers: any = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'No boilerplates matching the tooling version was found on your system.\nDo you want to find Dolittle\'s boilerplates?'}]);   
    return answers['download'];
}
function printCliVersion() {
    outputter.print(`${pkg.name} v${pkg.version}`);
}

function hasBoilerplates() {
    let boilerplatesConfigObj = boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}
function hasProjectConfiguration() {
    let projectConfigObj = projectConfig;
    return fs.existsSync(projectConfigObj.path);
}