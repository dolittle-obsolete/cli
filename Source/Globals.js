/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandManager } from './Commands/CommandManager';
import { Inquirer } from './Inquirer';

class Globals {
    #inquirer;
    #commandManager;

    constructor () {
        this.#installHandlers();

        this.#inquirer = new Inquirer();
        this.#commandManager = new CommandManager();
    }

    get inquirer() {
        return this.#inquirer;
    }
    get commandManager() {
        return this.#commandManager;
    }

    #installHandlers() {
        process.on('unhandledRejection', (reason, _) => {
            console.error('Unhandled rejection:', reason.stack)
        });
    }
    
}

export default new Globals();