/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './turnOffLogging';
import { 
    askToDownloadOrUpdateBoilerplates, fetchDolittleBoilerplates, BoilerplatePackageInfo,
    boilerplateDiscoverers, onlineDolittleBoilerplatesFinder, boilerplatesConfig,
    boilerplatesLoader 
} from "@dolittle/tooling.common.boilerplates";
import { dolittleConfig } from '@dolittle/tooling.common.configurations';
import { initializer, projectConfig, ProjectConfigObject, HostPackage } from '@dolittle/tooling.common';
import { commandManager } from '@dolittle/tooling.common.commands';
import { dependencyResolvers, dependencyDiscoverResolver } from "@dolittle/tooling.common.dependencies";
import { fileSystem } from "@dolittle/tooling.common.files";
import { connectionChecker, npmPackageDownloader, latestNpmPackageVersionFinder } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import inquirer from 'inquirer';
import updateNotifier from 'update-notifier';
import {askForCoreLanguage, Outputter, Parser, BusyIndicator, PromptDependencyResolver, Commands, ICommands, CliConfig, CliConfigObject } from './internal';

// Setup constants

const pkg = require('../package.json');
const notifier = updateNotifier(
    {
        pkg, 
        updateCheckInterval: 1000 * 60 * 60 * 24, // A day
    }
);

let commands: ICommands; 
const outputter: ICanOutputMessages = new Outputter();
const busyIndicator: IBusyIndicator = new BusyIndicator();
const parsingResult = new Parser().parse();

let cliConfig = new CliConfig();
cliConfig.store;

// Run CLI procedure
runDolittleCli();

/**
 * The starting point for the CLI
 *
 */
async function runDolittleCli() {
    dependencyResolvers.add(
        new PromptDependencyResolver(dependencyDiscoverResolver, dolittleConfig, outputter)
    );
    notifier.notify(
        {
            isGlobal: true, 
            message: 'There seems to be a new version of the CLI. Run \'dolittle check\' to check and update'
        }
    );
    handleIfCheckingVersion();
    await handleIfMissingPrerequsites();

    await setupToolingSystem();
    // setupTabCompletion(commandManager, globals.outputter);
    try {
        await commands.execute(parsingResult, projectConfig.store as ProjectConfigObject);
    } catch(error) {
        outputter.error(error)
    }
}
function handleIfCheckingVersion() {
    if (parsingResult.version) {
        printCliVersion();
        process.exit(0);
    }
}

async function handleIfMissingPrerequsites() {
    if (!(await hasProjectConfiguration())) {
        let coreLanguage;
        while (!coreLanguage) coreLanguage = await askForCoreLanguage();

        projectConfig.store = {coreLanguage};
    }
    // Should only ask for boilerplates once
    if (!hasBoilerplates() && !cliConfig.store.ignoreBoilerplatePrompt) {
        let shouldDownload = await askToFindBoilerplates();
        if (shouldDownload) {
            let boilerplatePackages = await fetchDolittleBoilerplates(onlineDolittleBoilerplatesFinder, connectionChecker, busyIndicator);
            await askToDownloadOrUpdateBoilerplates(boilerplatePackages as BoilerplatePackageInfo[], boilerplateDiscoverers, boilerplatesLoader, dependencyResolvers, npmPackageDownloader, connectionChecker, busyIndicator);
        }
        else {
            let cliConfigObject: CliConfigObject = cliConfig.store as any;
            cliConfigObject.ignoreBoilerplatePrompt = true;
            cliConfig.store = cliConfigObject;
        }
    }
}

async function setupToolingSystem() {
    await initializer.initialize(pkg as HostPackage, dependencyResolvers, busyIndicator);
    commands = new Commands(commandManager, dependencyResolvers, outputter, busyIndicator, latestNpmPackageVersionFinder, npmPackageDownloader, connectionChecker);
    await commands.initialize();
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


async function hasProjectConfiguration() {
    let projectConfigObj = projectConfig;
    let exists = await fileSystem.exists(projectConfigObj.path);
    return exists;
}

// function setupTabCompletion(commandManager: ICommands, outputter: ICanOutputMessages) {
//     const omelette = require('omelette');
//     let commands = commandManager.commands;
//     let commandGroups = commandManager.commandGroups;
//     let namespaces = commandManager.namespaces;
    
    
//     try {
//         let complete = omelette('dolittle|dol');
//         if (~process.argv.indexOf('--completion')) {
//             outputter.print('Creating cli completion')
//             let tree = createCommandTree(commands, commandGroups, namespaces);
//             complete.tree(tree);
//             complete.init();
//         }
//         if (~process.argv.indexOf('--setup')) {
//             complete.setupShellInitFile();
//             outputter.print('Setup cli auto completion');
//         }
//     } catch(error) {

//     }
    
// }

// function createCommandTree(commands: Command[], commandGroups: CommandGroup[], namespaces: Namespace[]): any {
//     let tree: any = {};
//     commands.forEach(cmd => {
//         tree[cmd.name] = [];
//     });
//     commandGroups.forEach(commandGroup => {
//         tree[commandGroup.name] = commandGroup.commands.map(_ => _.name);
//     });
//     namespaces.forEach(namespace => {
//         let subTree: any = {}
//         namespace.commands.forEach(_ => subTree[_.name] = []);
//         namespace.commandGroups.forEach(commandGroup => {
//             subTree[commandGroup.name] = commandGroup.commands.map(_ => _.name);
//         })
//         tree[namespace.name] = subTree;
//     })
//     return tree;
// }
