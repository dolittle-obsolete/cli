/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from "./Outputter";
import {ProjectConfig} from '@dolittle/tooling.common.configurations';
import {IBoilerplateDiscoverers, BoilerplatesConfig, IApplicationsManager, IArtifactTemplatesManager, IBoundedContextsManager, IBoilerplateManagers, ICanFindOnlineBoilerplatePackages} from "@dolittle/tooling.common.boilerplates"
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import * as FsExtra from 'fs-extra'
import { Folders } from "@dolittle/tooling.common.utilities";

/**
 * The context needed by commands to perform their actions
 *
 * @export
 * @class CliContext
 */
export class CliContext {

    /**
     * Creates an instance of CliContext.
     * @param {string} cwd
     * @param {Outputter} outputter
     * @param {*} dolittleConfig
     * @param {ProjectConfig} projectConfig
     * @param {BoilerplatesConfig} boilerplatesConfig
     * @param {IApplicationsManager} applicationsManager
     * @param {IArtifactTemplatesManager} artifactTemplatesManager
     * @param {IBoundedContextsManager} boundedContextsManager
     * @param {IDependencyResolvers} dependencyResolvers
     * @param {IBoilerplateManagers} boilerplateManagers
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @memberof CliContext
     */
    constructor(cwd: string, outputter: Outputter, dolittleConfig: any, projectConfig: ProjectConfig, boilerplatesConfig: BoilerplatesConfig,
        applicationsManager: IApplicationsManager, artifactTemplatesManager: IArtifactTemplatesManager, boundedContextsManager: IBoundedContextsManager,
        dependencyResolvers: IDependencyResolvers, boilerplateManagers: IBoilerplateManagers, boilerplateDiscoverers: IBoilerplateDiscoverers, 
        onlineBoilerplateDiscoverer: ICanFindOnlineBoilerplatePackages, folders: Folders, fileSystem: typeof FsExtra) {
        
        this.cwd = cwd;
        this.outputter = outputter;
        this.dolittleConfig = dolittleConfig;
        this.projectConfig = projectConfig;
        this.boilerplatesConfig = boilerplatesConfig;
        this.applicationsManager = applicationsManager;
        this.artifactTemplatesManager = artifactTemplatesManager;
        this.boundedContextsManager = boundedContextsManager;
        this.dependencyResolvers = dependencyResolvers;
        this.boilerplateManagers = boilerplateManagers;
        this.boilerplateDiscoverers = boilerplateDiscoverers;
        this.onlineBoilerplateDiscoverer = onlineBoilerplateDiscoverer;
        this.folders = folders;
        this.fileSystem = fileSystem;

        
    }
    /**
     * The namespace of the CLI context
     *
     * @type {string}
     * @memberof CliContext
     */
    namespace!: string;
    /**
     * The current working directory
     * @type {string}
     * @readonly
     * @memberof CliContext
     */
    readonly cwd: string
    /**
     * The CLI outputter
     * @type {Outputter}
     * @readonly
     * @memberof CliContext
     */
    readonly outputter: Outputter
    /**
     * The dolittle config
     *
     * @readonly
     * @memberof CliContext
     */
    readonly dolittleConfig: any
    /**
     * The project configuration object
     * @type {ProjectConfig}
     * @readonly
     * @memberof CliContext
     */
    readonly projectConfig: ProjectConfig
    /**
     * The boilerplates configuration object
     * @type {BoilerplatesConfig}
     * @readonly
     * @memberof CliContext
     */
    readonly boilerplatesConfig: BoilerplatesConfig
    /**
     * The applications manager
     *
     * @type {IApplicationsManager}
     * @memberof CliContext
     */
    readonly applicationsManager: IApplicationsManager
    /**
     * The artifact templates manager
     *
     * @type {IArtifactTemplatesManager}
     * @memberof CliContext
     */
    readonly artifactTemplatesManager: IArtifactTemplatesManager
    /**
     * The bounded contextss manager
     *
     * @type {IBoundedContextsManager}
     * @memberof CliContext
     */
    readonly boundedContextsManager: IBoundedContextsManager
    /**
     * The dependency resolvers
     *
     * @type {IDependencyResolvers}
     * @memberof CliContext
     */
    readonly dependencyResolvers: IDependencyResolvers 
    /**
     * The boilerplate managers
     *
     * @type {IBoilerplateManagers}
     * @memberof CliContext
     */
    readonly boilerplateManagers: IBoilerplateManagers 
    /**
     * The boilerplate discoverers
     *
     * @type {IBoilerplateDiscoverers}
     * @memberof CliContext
     */
    readonly boilerplateDiscoverers: IBoilerplateDiscoverers
    /**
     * The instance that can find online boilerplates
     *
     * @type {ICanFindOnlineBoilerplatePackages}
     * @memberof CliContext
     */
    readonly onlineBoilerplateDiscoverer: ICanFindOnlineBoilerplatePackages
    /**
     * The filesystem
     *
     * @type {typeof FsExtra}
     * @memberof CliContext
     */
    readonly fileSystem: typeof FsExtra 
    /**
     * The folders object
     *
     * @type {Folders}
     * @memberof CliContext
     */
    readonly folders: Folders
}
