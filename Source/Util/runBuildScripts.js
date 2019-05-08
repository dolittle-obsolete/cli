/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ParserResult } from '../ParserResult';
import { ProjectConfig } from '@dolittle/tooling.common/dist/configuration/ProjectConfig';
import { BaseBoilerplate } from '@dolittle/tooling.common/dist/boilerplates/BaseBoilerplate';
import { runScriptsSync } from '@dolittle/tooling.common/dist/boilerplates/Scripts';
import { Outputter } from '../Outputter';

/**
 * Runs the creation scripts of boilerplates
 *
 * @export
 * @param {{boilerplate: BaseBoilerplate, destination: string}[]} boilerplateAndDestinations
 * @param {Outputter} outputter
 * @returns {any}
 */
export function runCreationScripts(boilerplateAndDestinations, outputter, onStderr, onStdout, onError) {
    boilerplateAndDestinations.forEach(_ => {
        let scripts = _.boilerplate.scripts.creation;
        let cwd = _.destination;
        if (scripts && scripts.length > 0) {
            outputter.print(`Running creation scripts for boilerplate ${_.boilerplate.name}. This might take a while`);
            runScriptsSync(scripts, cwd, onStderr, onStdout, onError); 
        }
    });
}