#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';

args
    .example('dolittle cluster add [name] [url]', 'Adds a cluster to the configuration');
    
if (args.sub.length == 0) args.showHelp();