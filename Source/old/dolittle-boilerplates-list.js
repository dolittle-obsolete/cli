#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import Outputter from '../Outputter';

let spinner = Outputter.spinner('Boilerplates in use:\n').start();

let boilerplates = boilerPlatesManager.boilerPlates;
let numBoilerplates = boilerplates.length;
if (numBoilerplates > 0) {
    spinner.succeed(`There are ${numBoilerplates} in use`);
    boilerplates.forEach(boilerplate => {
        Outputter.print(
            `${boilerplate.name}: 
    Type: ${boilerplate.type}
    Language: ${boilerplate.language}
    Description: ${boilerplate.description}
    `);
    });
}
else {
    spinner.warn('There are no boilerplates in use.\nDo you have any installed? use \'dolittle boilerplates discover\'\nUse \'dolittle boilerplates online\' to discover what\'s available on npm');
}
