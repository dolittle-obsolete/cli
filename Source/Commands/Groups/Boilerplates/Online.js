/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import onlineBoilerplates from './fetchOnlineBoilerplates';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';

class Online extends Command {
    /**
     * Creates an instance of {Online}.
     * @memberof Online
     */
    constructor() {
        super('online', 'Lists boilerplates found on npm', 'dolittle boilerplates online [keywords...] [-l | --limit]', group, 
            [
                '\tkeywords: Additional keywords used in the npmjs search',
                '\t-l | --limit: The maximum limit of fetched npm packages. Cannot exceed 250 or be lower that 0'
            ].join('\n'));
    }

    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }

        let keywords = [parserResult.firstArg, ...parserResult.restArgs, ...parserResult.extraArgs];
        let limit = parserResult.extraOpts['l']? parserResult.extraOpts['l'] : parserResult.extraOpts['limit'];

        let boilerplates = await onlineBoilerplates(context.managers.boilerplatesManager, context.outputter, keywords, limit? limit : 250);
        boilerplates.map(_ => `${_.name}@${_.version}`).forEach(_ => context.outputter.print(_));
        if (boilerplates.length && boilerplates.length > 0) {
            const shouldDownload = await askToDownload();
            if (shouldDownload) {
                let useYarn = false;
                let packageNames = await askWhichBoilerplates(boilerplates);
                if (packageNames.length > 0) {
                    let spinner = context.outputter.spinner('Downloading boilerplates').start();
                    if (!useYarn)
                        spawn.sync('npm', ['i', '-g', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                    else 
                        spawn.sync('yarn', ['global', 'add', ...packageNames], {cwd: process.cwd(), stdio: 'inherit'});
                    spinner.succeed('Boilerplates downloaded');
                }
            }
        } 
    }
}

async function askUseYarn() {
    let answers = await inquirer.prompt([{type: 'confirm', default: false, name: 'yarn', message: 'Download packages using yarn? (We currently recommend not to)'}]);   
    return answers['yarn'];
}
async function askToDownload() {
    let answers = await inquirer.prompt([{type: 'confirm', default: false, name: 'download', message: 'Download and update boilerplates?'}]);   
    return answers['download'];
}
async function askWhichBoilerplates(boilerplates) {
    let answers = await inquirer.prompt([
        {type: 'confirm', name: 'downloadAll', default: false, message: 'All available boilerplates? '}
    ]);
    if (!answers['downloadAll']) {
        let choices = boilerplates.map(_ => new Object({name: `${_.name}`, value: `${_.name}@${_.version}`}));
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

export default new Online();