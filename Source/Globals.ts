/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { applicationsManager, artifactTemplatesManager, boilerplateDiscoverers, boilerplateManagers, boilerplatesConfig, boundedContextsManager, onlineBoilerplateFinders, projectConfig } from '@dolittle/tooling.common.boilerplates';
import { dependenciesManager, dependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { dolittleConfig, fileSystem, folders, logger } from '@dolittle/tooling.common.utilities';
import updateNotifier from 'update-notifier';
import { CliContext } from './CliContext';
import { CommandManager } from './Commands/CommandManager';
import { ICommandManager } from './Commands/ICommandManager';
import { PromptDependencyResolver } from './PromptDependencyResolver';
import { Outputter } from './Outputter';
import { Parser } from './Parser';

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
    readonly commandManager: ICommandManager;
    readonly cliContext: CliContext;
    private readonly _outputter: Outputter;

    /**
     * Creates an instance of {Globals}.
     * @memberof Globals
     */
    constructor () {
        this.parser = new Parser();
        this._outputter = new Outputter();
        this.initialize();
        this.commandManager = new CommandManager(applicationsManager, boundedContextsManager, artifactTemplatesManager, dependenciesManager, boilerplateManagers);
        this.cliContext = new CliContext(
            process.cwd(), this._outputter, dolittleConfig, projectConfig, boilerplatesConfig, applicationsManager, artifactTemplatesManager,
            boundedContextsManager,dependencyResolvers, boilerplateManagers, boilerplateDiscoverers, onlineBoilerplateFinders[0], folders, fileSystem
        );
    }
    private initialize() {
        this.installHandlers();
        logger.transports.forEach((t: any) => t.silent = true); // Turn off winston logging
        notifier.notify({isGlobal: true, message: 'There seems to be a new version of the CLI. Run \'dolittle check\' to check and update'});
        dependencyResolvers.addResolvers(new PromptDependencyResolver(dependenciesManager, dolittleConfig, this._outputter));
    }
    
    private installHandlers() {
        process.on('unhandledRejection', (reason, _) => {
            this._outputter.error(<Error>reason);
            process.exit(1);
        });
    }
}

export default new Globals();