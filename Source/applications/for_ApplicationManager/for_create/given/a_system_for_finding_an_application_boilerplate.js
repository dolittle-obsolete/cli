/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ApplicationManager } from '../../../ApplicationManager';
import { BoilerPlate } from '../../../../boilerPlates/BoilerPlate';
import { an_application_manager } from '../../given/an_application_manager';
import path from 'path';
const boilerPlates = [
    new BoilerPlate('csharp', 'Application Boilerplate', 'The Description', 'application')
];
export class a_system_for_finding_for_an_application_boilerplate extends an_application_manager {
    constructor() {
        super();
        this.boilerPlatesManager = {
            boilerPlatesByType: sinon.stub().returns(boilerPlates),
            createInstance: sinon.stub()
        };
        this.boilerPlates = boilerPlates;
        this.applicationManager = new ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, this.fileSystem, logger);
        this.context = {
            name: 'TheApplication',
            destination: path.join('path','to','application')
        };
    }
}