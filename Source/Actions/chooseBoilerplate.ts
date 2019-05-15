/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BaseBoilerplate } from '@dolittle/tooling.common.boilerplates';
import inquirer, { Question } from 'inquirer';

/**
 * Prompts the user to choose a boilerplate
 * @param {BaseBoilerplate[]} boilerplates
 */
export default async function chooseBoilerplate(boilerplates: BaseBoilerplate[]) {
    if (boilerplates.length && boilerplates.length > 0) {
        let boilerplate = await askWhichBoilerplate(boilerplates);
        return boilerplate;
    }
    return null;
}

/**
 * Asks the user which boilerplate to choose
 *
 * @param {BaseBoilerplate[]} boilerplates
 * @returns {Promise<BaseBoilerplate>}
 */
async function askWhichBoilerplate(boilerplates: BaseBoilerplate[]) {
    let choices: Question[] = boilerplates.map(boilerplate => new Object({name: `${boilerplate.namespace? `${boilerplate.namespace}::`: ''}${boilerplate.name} language: ${boilerplate.language}`, value: boilerplate}));
    let answers: {boilerplate: BaseBoilerplate} = await inquirer.prompt([
        {
            type: 'list', name: 'boilerplate', message: 'Choose boilerplate:',
            choices
        }
    ]);
    return answers['boilerplate'];
}