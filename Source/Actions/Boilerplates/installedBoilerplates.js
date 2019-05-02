/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import path from 'path';
import { Outputter } from '../../Outputter';
import { BoilerplatesManager } from '@dolittle/tooling.common';


/**
 * Finds and gets the boilerplates installed on the local machine
 *
 * @export
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {import('fs')} filesystem
 * 
 * @returns {{boilerplate: any, packageJson: any}[]} A list of the boilerplate and package configurations for each boilerplate
 */
export default async function installedBoilerplates(outputter, boilerplatesManager, filesystem) {
    let spinner = outputter.spinner('Getting installed boilerplates:\n').start();
    try {
        let paths = boilerplatesManager.installedBoilerplatePaths;
    
        let boilerplatesAndPackages = paths.map(boilerplatePaths => {
            let boilerplate = JSON.parse(filesystem.readFileSync(path.join(boilerplatePaths, 'boilerplate.json')));
            let packageJson = JSON.parse(filesystem.readFileSync(path.join(boilerplatePaths, 'package.json')));
            return {boilerplate, packageJson};
        });
        let numBoilerplates = boilerplatesAndPackages.length;
        if (numBoilerplates > 0) spinner.succeed(`Found ${numBoilerplates} installed boilerplates`);
        else spinner.warn('Could not find any installed boilerplates.\nUse \'dolittle boilerplates online\' to discover what\'s available on npm');
        
        return boilerplatesAndPackages;
    } catch (error) {
        spinner.fail(`An error occured: ${error.message? error.message : error}`);
        throw error;
    }
}