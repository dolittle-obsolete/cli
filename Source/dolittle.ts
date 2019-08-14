#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from './Globals';
import { askToDownloadOrUpdateBoilerplates, fetchDolittleBoilerplates, BoilerplatePackageInfo, projectConfig, boilerplateDiscoverers, onlineDolittleBoilerplatesFinder, boilerplatesConfig, boilerplatesLoader } from "@dolittle/tooling.common.boilerplates";
import fs from 'fs';
import inquirer from 'inquirer';
import askForCoreLanguage from './askForCoreLanguage';
import { dependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ICommands } from './Commands/ICommands';
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { Command } from './Commands/Command';
import { CommandGroup } from './Commands/CommandGroup';
import { Namespace } from './Commands/Namespace';
import { fetchDolittlePlugins, onlineDolittlePluginsFinder, askToDownloadOrUpdatePlugins, plugins } from '@dolittle/tooling.common.plugins';
import { connectionChecker, npmPackageDownloader } from '@dolittle/tooling.common.packages';

let defaultPlugins = [
    '@dolittle/tooling.plugin.runtime'
];
const pkg = require('../package.json');
runDolittleCli();

async function runDolittleCli() {
    let outputter = globals.outputter;
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
    if (! (await hasDefaultPlugins())) {
        outputter.warn('Default dolittle plugins not installed.');
        let pluginPackages = await fetchDolittlePlugins(onlineDolittlePluginsFinder, connectionChecker, globals.busyIndicator);
        await askToDownloadOrUpdatePlugins(pluginPackages, plugins, dependencyResolvers, npmPackageDownloader, connectionChecker, globals.busyIndicator);
    
    }
    if (!hasBoilerplates()) {
        let shouldDownload = await askToFindBoilerplates();
        if (shouldDownload) {
            let boilerplatePackages = await fetchDolittleBoilerplates(onlineDolittleBoilerplatesFinder, connectionChecker, globals.busyIndicator);
            await askToDownloadOrUpdateBoilerplates(boilerplatePackages as BoilerplatePackageInfo[], boilerplateDiscoverers, boilerplatesLoader, dependencyResolvers, npmPackageDownloader, connectionChecker, globals.busyIndicator);
        }
    }
    let commandManager = await globals.getCommandsSystem();
    // setupTabCompletion(commandManager, globals.outputter);
    try {
        await commandManager.execute(parseResult, projectConfig, globals.outputter);
    } catch(error) {
        globals.outputter.error(error)
    }
}
async function askToFindBoilerplates() {
    let answers: any = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'No boilerplates matching the tooling version was found on your system.\nDo you want to find Dolittle\'s boilerplates?'}]);   
    return answers['download'];
}
function printCliVersion() {
    globals.outputter.print(`${pkg.name} v${pkg.version}`);
}

function hasBoilerplates() {
    let boilerplatesConfigObj = boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}
async function hasDefaultPlugins() {

    let discoveredPlugins = await plugins.getPluginPackages();
    if (discoveredPlugins.length === 0) {
        await plugins.discoverNewPlugins();
        discoveredPlugins = await plugins.getPluginPackages();
    }
    
    return defaultPlugins.every(_ => discoveredPlugins.map(_ => _.packageJson.name).includes(_));
}
function hasProjectConfiguration() {
    let projectConfigObj = projectConfig;
    return fs.existsSync(projectConfigObj.path);
}

function setupTabCompletion(commandManager: ICommands, outputter: ICanOutputMessages) {
    const omelette = require('omelette');
    let commands = commandManager.commands;
    let commandGroups = commandManager.commandGroups;
    let namespaces = commandManager.namespaces;
    
    
    try {
        let complete = omelette('dolittle|dol');
        if (~process.argv.indexOf('--completion')) {
            outputter.print('Creating cli completion')
            let tree = createCommandTree(commands, commandGroups, namespaces);
            complete.tree(tree);
            complete.init();
        }
        if (~process.argv.indexOf('--setup')) {
            complete.setupShellInitFile();
            outputter.print('Setup cli auto completion');
        }
    } catch(error) {

    }
    
}

function createCommandTree(commands: Command[], commandGroups: CommandGroup[], namespaces: Namespace[]): any {
    let tree: any = {};
    commands.forEach(cmd => {
        tree[cmd.name] = [];
    });
    commandGroups.forEach(commandGroup => {
        tree[commandGroup.name] = commandGroup.commands.map(_ => _.name);
    });
    namespaces.forEach(namespace => {
        let subTree: any = {}
        namespace.commands.forEach(_ => subTree[_.name] = []);
        namespace.commandGroups.forEach(commandGroup => {
            subTree[commandGroup.name] = commandGroup.commands.map(_ => _.name);
        })
        tree[namespace.name] = subTree;
    })
    return tree;
}
