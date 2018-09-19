#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

var inquirer = require('inquirer');
const USAGE = 'dolittle add aggregateroot';
args
    .example(USAGE, "Creates an aggregate root in the current folder");
 
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add aggregateroot'});

inquirer.prompt(global.languageQuestion).then(answers => {
    global.artifactsManager.createAggregateRoot(answers.language);
  });