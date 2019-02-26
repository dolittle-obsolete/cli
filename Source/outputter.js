/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import chalk from 'chalk';
import ora from 'ora';

export class Outputter {
    
    print(...args) {
        console.log(...args);
    }
    warn(...args) {
        console.warn(...args.map(_ => chalk.yellow(_)));
    }
    
    error(error, ...args) {
        console.error(chalk.red(error.stack));
        if (args && args.length > 0) {
            console.error();
            console.error(...args.map(_ => chalk.red(_)));
        }
    
    }
    spinner(...args) {
        return ora(...args);
    }
}

export default new Outputter();
