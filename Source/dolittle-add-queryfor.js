#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

var inquirer = require('inquirer');

const USAGE = 'dolittle add queryfor';
args
    .example(USAGE, "Creates a query for a read model in the current folder");
 
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add queryfor'});

inquirer.prompt(global.languageQuestion).then(answers => {
    global.artifactsManager.createQueryFor(answers.language);
  });
