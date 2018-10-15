/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_boiler_plates_manager } from '../../given/a_boiler_plates_manager';
import { BoilerPlate } from '../../../BoilerPlate';
import { BoilerPlatesManager } from '../../../BoilerPlatesManager';

const boilerPlate = new BoilerPlate('csharp', 'Artifacts boilerplate');
const destination = '/somewhere/else/on/disk/';
const templates = [
    {
        name: 'Aggregate Root template',
        type: 'aggregateRoot',
        description: 'Creates an Aggregate Root',
        language: 'csharp',
        includedFiles: [
            '{{name}}.cs'
        ]
    },
    {
        name: 'Command template',
        type: 'command',
        description: 'Creates a Command',
        language: 'csharp',
        includedFiles: [
            '{{name}}.cs',
            '{{name}}InputValidator.cs',
            '{{name}}BusinessValidator.cs'
        ]
    },
    {
        name: 'Event template',
        type: 'event',
        description: 'Creates an Event',
        language: 'csharp',
        includedFiles: [
            '{{name}}.cs'
        ]
    },
    {
        name: 'Read Model template',
        type: 'readModel',
        description: 'Creates a Read Model',
        language: 'csharp',
        includedFiles: [
            '{{name}}.cs'
        ]
    },
];

export class all_artifact_templates extends a_boiler_plates_manager {
    constructor() {
        super();
        this.boilerPlate = boilerPlate;
        this.destination = destination;
        this.templates = templates;

        const templatePaths = ['/somewhere/on/disk/csharp/command/template.js',
            '/somewhere/on/disk/csharp/aggregateroot/template.js',
            '/somewhere/on/disk/csharp/event/template.js',
            '/somewhere/on/disk/csharp/readmodel/template.js'];

        this.folders = {
            makeFolderIfNotExists: sinon.stub(),
            searchRecursive: sinon.stub().returns(templatePaths)
        };

        this.fileSystem.existsSync = sinon.stub().returns(false);
        this.fileSystem.readFileSync = sinon.stub()
            .withArgs('/somewhere/on/disk/csharp/command/template.js', 'utf8').returns(JSON.stringify(templates[1]))
            .withArgs('/somewhere/on/disk/csharp/aggregateroot/template.js', 'utf8').returns(JSON.stringify(templates[0]))
            .withArgs('/somewhere/on/disk/csharp/event/template.js', 'utf8').returns(JSON.stringify(templates[2]))
            .withArgs('/somewhere/on/disk/csharp/readmodel/template.js', 'utf8').returns(JSON.stringify(templates[3]));
        this.fileSystem.writeFileSync = sinon.stub();
        this.boilerPlatesManager = new BoilerPlatesManager(
            this.configManager,
            this.httpWrapper,
            this.git,
            this.folders,
            this.fileSystem,
            logger
        );
    }
}