/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IBoilerplateDiscoverers } from '@dolittle/tooling.common.boilerplates';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import { Outputter } from '../../Outputter';
import requireInternet from '../../Util/requireInternet';
import initBoilerplatesSystem from './initBoilerplatesSystem';

export type BoilerplatePackageInfo = {
    name: string, version: string, latest?: string
}

/**
 * Performs the action that asks the user whether or not to download or update boilerplate packages 
 *
 * @export
 * @param {BoilerplatePackageInfo[]} boilerplates
 * @param {Outputter} outputter
 */
export default async function askToDownloadOrUpdateBoilerplates(boilerplates: BoilerplatePackageInfo[], boilerplateDiscoverers: IBoilerplateDiscoverers, outputter: Outputter) {
    await requireInternet(outputter);
    if (boilerplates.length && boilerplates.length > 0) {
        const shouldDownload = await askToDownload();
        if (shouldDownload) {
            let useYarn = false;
            let packageNames = await askWhichBoilerplates(boilerplates);
            if (packageNames.length > 0) {
                if (!useYarn) 
                    spawn.sync('npm', ['i', '-g', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                else 
                    spawn.sync('yarn', ['global', 'add', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                await initBoilerplatesSystem(outputter, boilerplateDiscoverers);
            }
        }
    }
}
async function askUseYarn() {
    let answers: any = await inquirer.prompt([{type: 'confirm', default: false, name: 'yarn', message: 'Download packages with yarn? (We currently recommend not to)'}]);   
    return answers['yarn'];
}
async function askToDownload() {
    let answers: any = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'Download latest boilerplates?'}]);   
    return answers['download'];
}
async function askWhichBoilerplates(boilerplates: BoilerplatePackageInfo[]) {
    let answers: any = await inquirer.prompt([
        {type: 'confirm', name: 'downloadAll', default: false, message: 'Download all? '}
    ]);
    if (!answers['downloadAll']) {
        let choices = boilerplates.map(_ => new Object({name: `${_.name}`, value: `${_.name}@${_.latest? _.latest : _.version}`}));
        answers = await inquirer.prompt([
            {
                type: 'checkbox', name: 'boilerplates', message: 'Choose boilerplates:',
                choices,
                validate: function(answer) {
                    if (answer.length < 1) return 'You must at least choose one boilerplate';
                    return true;
                }
            }
        ]);
        return answers['boilerplates'];
    }
    return boilerplates.map(_ => `${_.name}@${_.latest || _.version}`);
}