/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { commandManager } from '@dolittle/tooling.common.commands';
import { dependencyResolvers, dependencyDiscoverResolver } from '@dolittle/tooling.common.dependencies';
import updateNotifier from 'update-notifier';
import { CliCommandManager } from './Commands/CliCommandManager';
import { ICliCommandManager } from './Commands/ICliCommandManager';
import { PromptDependencyResolver } from './PromptDependencyResolver';
import { Outputter } from './Outputter';
import { Parser } from './Parser';
import { dolittleConfig } from '@dolittle/tooling.common.configurations';

const pkg = require('../package.json');
const notifier = updateNotifier(
    {
        pkg, 
        updateCheckInterval: 1000 * 60 * 60 * 24, // A day
    }
);
/**
 * Initializes the CLI program
 *
 * @class Globals
 */
class Globals {
    readonly parser: Parser;
    readonly cliCommandManager: ICliCommandManager;
    private readonly _outputter: Outputter;

    /**
     * Creates an instance of {Globals}.
     * @memberof Globals
     */
    constructor () {
        this.parser = new Parser();
        this._outputter = new Outputter();
        this.initialize();
        this.cliCommandManager = new CliCommandManager(commandManager, dependencyResolvers);
    }
    private initialize() {
        this.installHandlers();
        notifier.notify({isGlobal: true, message: 'There seems to be a new version of the CLI. Run \'dolittle check\' to check and update'});
        dependencyResolvers.add(new PromptDependencyResolver(dependencyDiscoverResolver, dolittleConfig, this._outputter));
    }
    
    private installHandlers() {
        // process.on('unhandledRejection', (reason, _) => {
        //     this._outputter.error(<Error>reason);
        //     process.exit(1);
        // });
    }
}

export default new Globals();