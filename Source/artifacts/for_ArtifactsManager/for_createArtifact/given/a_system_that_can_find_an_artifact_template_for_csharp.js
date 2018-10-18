/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ArtifactsManager } from '../../../ArtifactsManager';
import { a_system_providing_a_boiler_plate_for_csharp_language } from './a_system_providing_a_boiler_plate_for_csharp_language';

export class a_system_that_can_find_an_artifact_template_for_csharp extends a_system_providing_a_boiler_plate_for_csharp_language {
    constructor() {
        super();
        const path = require('path');
        this.templateFileLocation = path.join('location', 'to');
        this.templateFilePaths = [
            path.join(this.templateFileLocation, 'template.json')
        ];
        this.artifactTemplateName = 'Artifact template name';
        this.artifactTemplateType = 'artifactType';
        this.artifactTemplateDescription = 'The description';
        this.artifactTemplateIncludedFiles = ['{{name}}.cs'];

        this.artifactTemplateJson = 
        `
        {
            "name": "${this.artifactTemplateName}",
            "type": "${this.artifactTemplateType}",
            "description": "${this.artifactTemplateDescription}",
            "language": "${this.boilerPlateLanguage}",
            "includedFiles": ["${this.artifactTemplateIncludedFiles[0]}"]
         }
         
        `;
        this.folders.searchRecursive = sinon.stub().returns(this.templateFilePaths);
        this.fileSystem.readFileSync = sinon.stub().returns(this.artifactTemplateJson);
        
        this.artifactsManager = new ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, this.fileSystem, logger);

        this.context = {
            artifactName: 'ArtifactName',
            destination: 'destination',
            artifactType: this.artifactTemplateType
        };
        
    }
}