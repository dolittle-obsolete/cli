/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import chalk from 'chalk';
import ora, {Options} from 'ora';

export class Outputter {
    
    print(...args: any[]) {
        console.log(...args);
    }
    warn(...args: any[]) {
        console.warn(...args.map(_ => chalk.yellow(_)));
    }
    
    error(error: Error, ...args: any[]) {
        error.stack
        console.error(chalk.red(error.stack || ''));
        if (args && args.length > 0) {
            console.error();
            console.error(...args.map(_ => chalk.red(_)));
        }
    
    }
    spinner(opts?: string | Options | undefined ) {
        return ora(opts);
    }
}
