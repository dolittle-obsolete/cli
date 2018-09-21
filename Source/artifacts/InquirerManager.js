/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import fs from 'fs';
import { QueryInquirer } from './QueryInquirer';
import { QueryforInquirer } from './QueryforInquirer';
import { CommandInquirer } from './CommandInquirer';
import { AggregateRootInquirer } from './AggregateRootInquirer';
import { EventInquirer } from './EventInquirer';
import { ReadModelInquirer } from './ReadModelInquirer';
import { EventProcessorInquirer } from './EventProcessorInquirer';
import { CommandHandlerInquirer } from './CommandHandlerInquirer';


const _folders = new WeakMap();
const _fileSystem = new WeakMap();



export class InquirerManager {
    /**
     * Initializes a new instance of {InquirerManager}
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(folders, fileSystem, logger) {
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;

        this._queryInquirer = new QueryInquirer(folders, fileSystem);
        this._queryforInquirer = new QueryforInquirer(folders, fileSystem);
        this._commandInquirer = new CommandInquirer(folders, fileSystem);
        this._commandHandlerInquirer = new CommandHandlerInquirer(folders, fileSystem);
        this._aggregateRootInquirer = new AggregateRootInquirer(folders, fileSystem);
        this._eventInquirer = new EventInquirer(folders, fileSystem);
        this._eventProcessorInquirer = new EventProcessorInquirer(folders, fileSystem);
        this._readModelInquirer = new ReadModelInquirer(folders, fileSystem);
        
    }
    /**
     * Create a command
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForCommand(flags) {
        return this._commandInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a command handler
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForCommandHandler(flags) {
        return this._commandHandlerInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create an aggregate root
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForAggregateRoot(flags) {
        return this._aggregateRootInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create an event
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForEvent(flags) {
        return this._eventInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create an event processor
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForEventProcessor(flags) {
        return this._eventProcessorInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a read model
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForReadModel(flags) {
        return this._readModelInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a query
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForQuery(flags) {
        return this._queryInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a query a read model
     * @param {any} flags
     * @returns {Promise<any>} 
     */
    promptForQueryfor(flags) {
        return this._queryforInquirer.promptUser(flags)
            .then(context => {
                return context;
            });
    }
}