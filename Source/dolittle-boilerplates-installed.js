#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';

let paths = boilerPlatesManager.installedBoilerplatePaths;

console.log('Installed boilerplates:\n');
paths.map(path => JSON.parse(require('fs').readFileSync(require('path').join(path, 'boilerplate.json'), {encoding: 'utf8'}))).forEach(boilerplate => {
    console.log(
`${boilerplate.name}: 
Type: ${boilerplate.type}
Language: ${boilerplate.language}
Description: ${boilerplate.description}
`);
});
