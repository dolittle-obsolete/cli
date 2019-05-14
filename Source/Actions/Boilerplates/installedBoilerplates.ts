/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import path from 'path';
import * as FsExtra from 'fs-extra';
import { Outputter } from '../../Outputter';
import { IBoilerplateDiscoverers } from '@dolittle/tooling.common.boilerplates';

/**
 * Finds and gets the boilerplates installed on the local machine
 *
 * @export
 * @param {Outputter} outputter
 * @param {ICanDiscoverBoilerplates} localBoilerplatesDiscoverer
 * @param {typeof FsExtra} filesystem
 * @returns A list of the boilerplate and package configurations for each boilerplate
 */
export default async function installedBoilerplates(outputter: Outputter, boilerplateDiscoverers: IBoilerplateDiscoverers, filesystem: typeof FsExtra) {
    let spinner = outputter.spinner('Getting installed boilerplates:\n').start();
    try {
        let paths = boilerplateDiscoverers.boilerplatePaths;
    
        let boilerplatesAndPackages = paths.map(boilerplatePaths => {
            let boilerplate = filesystem.readJSONSync(path.join(boilerplatePaths, 'boilerplate.json'));
            let packageJson = filesystem.readJsonSync(path.join(boilerplatePaths, 'package.json'));
            return {boilerplate, packageJson};
        });
        let numBoilerplates = boilerplatesAndPackages.length;
        if (numBoilerplates > 0) spinner.succeed(`Found ${numBoilerplates} installed boilerplates`);
        else spinner.warn(`Could not find any installed boilerplates.

Use 'dolittle boilerplates online' to discover what's available on npm.
Or use 'dolittle boilerplates dolittle' to discover boilerplates that the Dolittle team has made available on npm`);
        
        return boilerplatesAndPackages;
        
    } catch (error) {
        spinner.fail(`An error occured: ${error.message? error.message : error}`);
        throw error;
    }
}