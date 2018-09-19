#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

var inquirer = require('inquirer');
const USAGE = 'dolittle add command';
args
    .example(USAGE, "Creates a command in the current folder");
 
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add command'});

inquirer.prompt(global.languageQuestion).then(answers => {
    global.artifactsManager.createCommand(answers.language);
  });