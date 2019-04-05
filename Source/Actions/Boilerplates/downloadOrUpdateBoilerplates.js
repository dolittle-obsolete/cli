/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import initBoilerplates from './initBoilerplates';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import { Outputter } from '../../Outputter';
import { BoilerplatesManager } from '@dolittle/tooling.common/dist/boilerplates/BoilerplatesManager';

/**
 * Performs the action that asks the user whether or not to download or update boilerplate packages 
 *
 * @export
 * @param {{name: string, version: string}[]} boilerplates
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {Outputter} outputter
 * @returns {Promise<void>}
 */
export async function askToDownloadOrUpdateBoilerplates(boilerplates, boilerplatesManager, outputter) {
    if (boilerplates.length && boilerplates.length > 0) {
        const shouldDownload = await askToDownload();
        if (shouldDownload) {
            let useYarn = false;
            let packageNames = await askWhichBoilerplates(boilerplates);
            if (packageNames.length > 0) {
                let spinner = outputter.spinner('Downloading boilerplates').start();
                if (!useYarn) 
                    spawn.sync('npm', ['i', '-g', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                else 
                    spawn.sync('yarn', ['global', 'add', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});

                spinner.succeed('Boilerplates downloaded');
                await initBoilerplates(outputter, boilerplatesManager);
            }
        }
    }
}
/**
 * Ask user whether to use yarn for downloading boilerplate packages
 *
 * @returns {boolean}
 */
async function askUseYarn() {
    let answers = await inquirer.prompt([{type: 'confirm', default: false, name: 'yarn', message: 'Download packages using yarn? (We currently recommend not to)'}]);   
    return answers['yarn'];
}
/**
 * Ask user whether or not to download / update boilerplate packages
 *
 * @returns {boolean} 
 */
async function askToDownload() {
    let answers = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'Download and update boilerplates?'}]);   
    return answers['download'];
}
/**
 * Asks the user which boilerplates to download
 *
 * @param {*} boilerplates
 * @returns
 */
async function askWhichBoilerplates(boilerplates) {
    let answers = await inquirer.prompt([
        {type: 'confirm', name: 'downloadAll', default: false, message: 'All available boilerplates? '}
    ]);
    if (!answers['downloadAll']) {
        let choices = boilerplates.map(_ => new Object({name: `${_.name}`, value: `${_.name}@${_.latest? _.latest : _.version}`}));
        answers = await inquirer.prompt([
            {
                type: 'checkbox', name: 'boilerplates', message: 'Choose boilerplates:',
                choices,
                validate: function(answer) {
                    if (answer.length < 1) return 'You must atleast choose one boilerplate';
                    return true;
                }
            }
        ]);
        return answers['boilerplates'];
    }
    return boilerplates.map(_ => `${_.name}@${_.version}`);
}