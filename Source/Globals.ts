/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandManager } from './Commands/CommandManager';
import { CliContext } from './CliContext';
import outputter from './Outputter';
import updateNotifier from 'update-notifier';
import { projectConfig, boilerplatesConfig, applicationsManager, boundedContextsManager, artifactTemplatesManager, boilerplateManagers, boilerplateDiscoverers, onlineBoilerplateFinders } from '@dolittle/tooling.common.boilerplates';
import { ICommandManager } from './Commands/ICommandManager';
import { dependenciesManager, resolvers, dependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { logger, dolittleConfig, folders, fileSystem } from '@dolittle/tooling.common.utilities';
import { PromptDependencyResolver } from './PromptDependencyResolver';

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
    readonly commandManager: ICommandManager;
    readonly cliContext: CliContext;

    /**
     * Creates an instance of {Globals}.
     * @memberof Globals
     */
    constructor () {
        this.initialize();
        this.commandManager = new CommandManager(applicationsManager, boundedContextsManager, artifactTemplatesManager, dependenciesManager, boilerplateManagers);
        this.cliContext = new CliContext(
            process.cwd(), outputter, dolittleConfig, projectConfig, boilerplatesConfig, applicationsManager, artifactTemplatesManager,
            boundedContextsManager,dependencyResolvers, boilerplateManagers, boilerplateDiscoverers, onlineBoilerplateFinders[0], folders, fileSystem
        );
    }
    private initialize() {
        this.installHandlers();
        logger.transports.forEach((t: any) => t.silent = true); // Turn off winston logging
        notifier.notify({isGlobal: true, message: 'There seems to be a new version of the CLI. Run \'dolittle check\' to check and update'});
        resolvers.push(new PromptDependencyResolver(dependenciesManager, dolittleConfig));
    }
    
    private installHandlers() {
        process.on('unhandledRejection', (reason, _) => {
            outputter.error(<Error>reason);
            process.exit(1);
        });
    }
}

export default new Globals();