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
        this._aggregateRootInquirer = new AggregateRootInquirer(folders, fileSystem);
        this._eventInquirer = new EventInquirer(folders, fileSystem);
        this._readModelInquirer = new ReadModelInquirer(folders, fileSystem);
    }
    /**
     * Create a command
     * @param {string} language
     * @returns {Promise<any>} 
     */
    promptForCommand(language) {
        return this._commandInquirer.promptUser(language)
            .then(context => {
                return context;
            });
    }
    /**
     * Create an aggregate root
     * @param {string} language
     * @returns {Promise<any>} 
     */
    promptForAggregateRoot(language) {
        return this._aggregateRootInquirer.promptUser(language)
            .then(context => {
                return context;
            });
    }
    /**
     * Create an event
     * @param {string} language
     * @returns {Promise<any>} 
     */
    promptForEvent(language) {
        return this._eventInquirer.promptUser(language)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a read model
     * @param {string} language
     * @returns {Promise<any>} 
     */
    promptForReadModel(language) {
        return this._readModelInquirer.promptUser(language)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a query
     * @param {string} language
     * @returns {Promise<any>} 
     */
    promptForQuery(language) {
        return this._queryInquirer.promptUser(language)
            .then(context => {
                return context;
            });
    }
    /**
     * Create a query a read model
     * @param {string} language
     * @returns {Promise<any>} 
     */
    promptForQueryfor(language) {
        return this._queryforInquirer.promptUser(language)
            .then(context => {
                return context;
            });
    }
}