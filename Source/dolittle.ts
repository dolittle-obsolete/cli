#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './turnOffLogging';
import globals from './Globals';
import { askToDownloadOrUpdateBoilerplates, fetchDolittleBoilerplates, BoilerplatePackageInfo, projectConfig, boilerplateDiscoverers, onlineDolittleBoilerplatesFinder, boilerplatesConfig } from "@dolittle/tooling.common.boilerplates";
import fs from 'fs';
import inquirer from 'inquirer';
import askForCoreLanguage from './askForCoreLanguage';
import { dependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { ICommands } from './Commands/ICommands';
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { WrappedCommand } from './Commands/WrappedCommand';
import { WrappedCommandGroup } from './Commands/WrappedCommandGroup';
import { WrappedNamespace } from './Commands/WrappedNamespace';
import { pluginDiscoverers, pluginsConfig, fetchDolittlePlugins, onlineDolittlePluginsFinder, askToDownloadOrUpdatePlugins, plugins } from '@dolittle/tooling.common.plugins';

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
    if (!hasDefaultPlugins()) {
        outputter.warn('Default dolittle plugins not installed.');
        let pluginPackages = await fetchDolittlePlugins(onlineDolittlePluginsFinder, globals.busyIndicator);
        await askToDownloadOrUpdatePlugins(pluginPackages, plugins, dependencyResolvers, globals.busyIndicator);
    
    }
    if (!hasBoilerplates()) {
        let boilerplatePackages = [];
        let shouldDownload = await askToFindBoilerplates();
        if (shouldDownload) {
            boilerplatePackages = await fetchDolittleBoilerplates(onlineDolittleBoilerplatesFinder, globals.busyIndicator);
            await askToDownloadOrUpdateBoilerplates(boilerplatePackages as BoilerplatePackageInfo[], boilerplateDiscoverers, dependencyResolvers, globals.busyIndicator);
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
    let boilerplatePaths = boilerplateDiscoverers.boilerplatePaths;
    if (boilerplatePaths.length > 0) boilerplateDiscoverers.discover();
    let boilerplatesConfigObj = boilerplatesConfig.store;
    return Object.keys(boilerplatesConfigObj).length > 0;
}
function hasDefaultPlugins() {

    let discoveredPlugins = pluginDiscoverers.discoveredPlugins;
    if (discoveredPlugins.length) pluginDiscoverers.discover();
    let pluginsConfigObj = pluginsConfig.store;
    let pluginNames = Object.keys(pluginsConfigObj); 
    return defaultPlugins.every(_ => pluginNames.includes(_));
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

function createCommandTree(commands: WrappedCommand[], commandGroups: WrappedCommandGroup[], namespaces: WrappedNamespace[]): any {
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
