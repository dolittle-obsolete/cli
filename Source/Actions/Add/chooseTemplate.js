/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from '../Outputter';
import inquirer from 'inquirer';
import { ArtifactTemplate } from '@dolittle/tooling.common/dist/boilerplates/BaseBoilerplate';

/**
 * Prompts the user to choose a boilerplate
 * @param {ArtifactTemplate[]} templates
 */
export default async function chooseBoilerplate(templates) {
    if (templates.length && templates.length > 0) {
        let template = await askWhichBoilerplate(templates);
        return template;
    }
}

/**
 * Asks the user which boilerplate to choose
 *
 * @param {BaseBoilerplate[]} boilerplates
 * @returns {Promise<BaseBoilerplate>}
 */
async function askWhichBoilerplate(boilerplates) {
    let choices = boilerplates.map(boilerplate => new Object({name: `${boilerplate.name} language: ${boilerplate.language}`, value: boilerplate}));
    let answers = await inquirer.prompt([
        {
            type: 'list', name: 'boilerplate', message: 'Choose boilerplate:',
            choices
        }
    ]);
    return answers['boilerplate'];
}