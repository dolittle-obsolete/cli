/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import inquirer, {Question} from 'inquirer';

function prompt(questions: Question[]) {
    return inquirer.prompt(questions);
}

export default prompt;
