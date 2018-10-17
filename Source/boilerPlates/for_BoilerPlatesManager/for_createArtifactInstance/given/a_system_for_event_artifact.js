/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { a_boiler_plates_manager } from '../../given/a_boiler_plates_manager';
import { BoilerPlatesManager } from '../../../BoilerPlatesManager';
import path from 'path';

const oldFileContent = 'some content';

export class a_system_for_event_artifact extends a_boiler_plates_manager {
    constructor() {
        super();
        this.templateLocation = 'somelocation';
        this.includedFiles = [
            '{{name}}.cs'
        ];
        this.eventArtifactTemplate = {
            template: {
                name: 'Event template',
                type: 'event',
                description: 'Creates an Event',
                language: 'csharp',
                includedFiles: this.includedFiles
            },
            location: this.templateLocation
        };
        this.folders.getArtifactTemplateFilesRecursivelyIn = sinon.stub().returns(this.includedFiles.map((file, _) => path.join(this.templateLocation, file)));
        
        this.fileSystem.readFileSync = sinon.stub().returns(oldFileContent);
        this.fileSystem.writeFileSync = sinon.stub();
        
        this.boilerPlatesManager = new BoilerPlatesManager(
            this.configManager,
            this.httpWrapper,
            this.git,
            this.folders,
            this.fileSystem,
            logger
        );
        this.destination = 'some destination';
        this.context = {
            name: 'TheEvent'
        };
    }
}