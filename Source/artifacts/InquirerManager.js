/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import fs from 'fs';
import { QueryInquirer } from './QueryInquirer';


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
}