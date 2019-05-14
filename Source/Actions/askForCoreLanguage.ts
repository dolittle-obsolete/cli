/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import inquirer from 'inquirer';

const languages = [{value: 'csharp', name: 'C#'}];
const answerName = 'language';
/**
 * Prompts the user for which core programming language to choose
 *
 * @returns
 */
export default async function askForCoreLanguage() {
    let answers: any = await inquirer.prompt([
        {
            type: 'list', name: answerName, message: 'Choose default core programming language:', 
            choices: languages
        }]);
    return answers[answerName];
}