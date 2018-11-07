/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp } from '../../given/a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp';
import { ArtifactsManager } from '../../../ArtifactsManager';
import { BoilerPlate } from '../../../../boilerPlates/BoilerPlate';

export class a_system_providing_a_boiler_plate_for_csharp_language extends a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp {
    constructor() {
        super();
        this.boilerPlateLanguage = 'csharp';
        this.boilerPlateName = 'The boiler plate';
        this.boilerPlateDescription = 'The boiler plate description';
        this.boilerPlateType = 'artifacts';
        this.boilerPlateDependencies = [];
        this.boilerPlateLocation = 'location';

        this.boilerPlate = new BoilerPlate(this.boilerPlateLanguage, this.boilerPlateName, this.boilerPlateDescription, this.boilerPlateType, this.boilerPlateDependencies, 
            this.boilerPlateLocation);
        this.boilerPlatesManager.boilerPlatesByLanguageAndType = sinon.stub()
            .returns( [
                this.boilerPlate
            ]);
        this.artifactsManager = new ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, this.fileSystem, logger);

    }
}