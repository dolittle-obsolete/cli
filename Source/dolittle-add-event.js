#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

var inquirer = require('inquirer');
const USAGE = 'dolittle add event';
args
    .example(USAGE, "Creates an event in the current folder");
 
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add event'});

inquirer.prompt(global.languageQuestion).then(answers => {
    global.artifactsManager.createEvent(answers.language);
  });