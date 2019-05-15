/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate } from '@dolittle/tooling.common.boilerplates';
import inquirer from 'inquirer';
import mapToInquirerChoices from '../../Util/mapToInquirerChoices';

/**
 * Prompts the user to choose a template
 * @param {ArtifactTemplate[]} templates
 */
export default async function chooseTemplate(templates: ArtifactTemplate[]) {
    if (templates.length && templates.length > 0) {
        let template = await askWhichTemplate(templates);
        return template;
    }
    return [];
}

/**
 * Asks the user which boilerplate to choose
 *
 * @param {ArtifactTemplate[]} templates
 * @returns {Promise<ArtifactTemplate>}
 */
async function askWhichTemplate(templates: ArtifactTemplate[]) {
    let choices = mapToInquirerChoices(
        templates,
        _ => `${_.name} language: ${_.boilerplate.language}`,
        _ => _
    );
    let answers: any = await inquirer.prompt([
        {
            type: 'list', name: 'artifactTemplate', message: 'Choose template:',
            choices
        }
    ]);
    return answers['artifactTemplate'];
}