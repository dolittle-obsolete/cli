/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';

export class Outputter implements ICanOutputMessages{
    
    print(...args: any[]) {
        console.log(...args);
    }
    warn(...args: any[]) {
        console.warn(...args.map(_ => chalk.yellow(_)));
    }
    
    error(...args: any[]) {
        if (args && args.length > 0) {
            console.error(...args.map(_ => chalk.red(_)));
        }
    }
}
