#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import path from 'path';
import {boilerPlatesManager, filesystem} from '@dolittle/tooling.common';
import Outputter from '../Outputter';

let spinner = Outputter.spinner('Installed boilerplates:\n').start();
let paths = boilerPlatesManager.installedBoilerplatePaths;

let boilerplatesAndPackages = paths.map(boilerplatePaths => {
    let boilerplate = filesystem.readJsonSync(path.join(boilerplatePaths, 'boilerplate.json'));
    let packageJson = filesystem.readJsonSync(path.join(boilerplatePaths, 'package.json'));
    return {boilerplate, packageJson};
});
let numBoilerplates = boilerplatesAndPackages.length;
if (numBoilerplates > 0) {
    spinner.succeed(`Found ${numBoilerplates} installed boilerplates`);
    boilerplatesAndPackages.forEach(boilerplateAndPackage => {
        Outputter.print(
            `${boilerplateAndPackage.packageJson.name}:${boilerplateAndPackage.packageJson.version} 
Boilerplate name: ${boilerplateAndPackage.boilerplate.name}
Description: ${boilerplateAndPackage.boilerplate.description}
Type: ${boilerplateAndPackage.boilerplate.type}
Language: ${boilerplateAndPackage.boilerplate.language}
`);
    });
}
else {
    spinner.warn('Could not find any installed boilerplates.\nUse \'dolittle boilerplates online\' to discover what\'s available on npm');
}

