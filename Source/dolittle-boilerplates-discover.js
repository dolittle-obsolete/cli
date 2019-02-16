#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import outputter from './outputter';

let discoverSpinner = outputter.spinner('Discovering installed boilerplates...').start();
boilerPlatesManager.discoverInstalledBoilerplates();
discoverSpinner.succeed('Finished discovering boilerplates');
