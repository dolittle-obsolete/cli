/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import inquirer from 'inquirer';

function prompt(questions) {
    return inquirer.prompt(questions);
}

export default prompt;
