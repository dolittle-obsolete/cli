/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from '../Outputter';
import inquirer from 'inquirer';
import { BaseBoilerplate } from '@dolittle/tooling.common/dist/boilerplates/BaseBoilerplate';

/**
 * Prompts the user to choose a boilerplate
 * @param {BaseBoilerplate[]} boilerplates
 */
export default async function chooseBoilerplate(boilerplates) {
    if (boilerplates.length && boilerplates.length > 0) {
        let boilerplate = await askWhichBoilerplate(boilerplates);
        return boilerplate;
    }
}

/**
 * Asks the user which boilerplate to choose
 *
 * @param {BaseBoilerplate[]} boilerplates
 * @returns {Promise<BaseBoilerplate>}
 */
async function askWhichBoilerplate(boilerplates) {
    let choices = boilerplates.map(boilerplate => new Object({name: `${boilerplate.namespace? `${boilerplate.namespace}::`: ''}${boilerplate.name} language: ${boilerplate.language}`, value: boilerplate}));
    let answers = await inquirer.prompt([
        {
            type: 'list', name: 'boilerplate', message: 'Choose boilerplate:',
            choices
        }
    ]);
    return answers['boilerplate'];
}