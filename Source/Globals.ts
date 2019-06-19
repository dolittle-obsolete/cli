/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { commandManager } from '@dolittle/tooling.common.commands';
import {initPluginSystem, plugins} from '@dolittle/tooling.common.plugins';
import { dependencyResolvers, dependencyDiscoverResolver } from '@dolittle/tooling.common.dependencies';
import updateNotifier from 'update-notifier';
import { CliCommandManager } from './Commands/CliCommandManager';
import { ICliCommandManager } from './Commands/ICliCommandManager';
import { PromptDependencyResolver } from './PromptDependencyResolver';
import { Outputter } from './Outputter';
import { Parser } from './Parser';
import { dolittleConfig } from '@dolittle/tooling.common.configurations';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { BusyIndicator } from './BusyIndicator';

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
    readonly parser= new Parser();
    readonly outputter: ICanOutputMessages = new Outputter();
    readonly busyIndicator: IBusyIndicator = new BusyIndicator();
    
    private _cliCommandManager!: ICliCommandManager;
    
    constructor() {
        notifier.notify({isGlobal: true, message: 'There seems to be a new version of the CLI. Run \'dolittle check\' to check and update'});
        dependencyResolvers.add(new PromptDependencyResolver(dependencyDiscoverResolver, dolittleConfig, this.outputter));
    }
    async getCommandManager() {
        if (!this._cliCommandManager) await this.init();
        return this._cliCommandManager;
    }

    private async init() {

        await initPluginSystem(plugins, this.busyIndicator, commandManager);
        this._cliCommandManager = new CliCommandManager(commandManager, dependencyResolvers);
    }
    
}

export default new Globals();