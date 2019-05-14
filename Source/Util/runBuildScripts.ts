/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from '../Outputter';
import {CreatedBoundedContextDetails, CreatedApplicationDetails, CreatedArtifactTemplateDetails, Script, BaseBoilerplate, runScriptsSync} from '@dolittle/tooling.common.boilerplates';

export function runCreationScripts(createdDetails: CreatedApplicationDetails[] | CreatedArtifactTemplateDetails[] | CreatedBoundedContextDetails[],
    outputter: Outputter, onStderr: (data: string) => void, onStdout: (data: string) => void, onError: (error: string | Error) => void) {

    createdDetails.forEach((_: CreatedApplicationDetails | CreatedArtifactTemplateDetails | CreatedBoundedContextDetails) => {
        let scripts: any[] = [];
        if (_.boilerplate) scripts.push(..._.boilerplate.scripts.creation);
        else if ((<CreatedArtifactTemplateDetails>_).artifactTemplate) {
            scripts.push(...(<CreatedArtifactTemplateDetails>_).boilerplate.scripts.creation);
        }
        let cwd = _.destination;
        if (scripts && scripts.length > 0) {
            outputter.print(`Running creation scripts for boilerplate ${_.boilerplate.name}. This might take a while`);
            runScriptsSync(scripts, cwd, onStderr, onStdout, onError); 
        }
    });
}