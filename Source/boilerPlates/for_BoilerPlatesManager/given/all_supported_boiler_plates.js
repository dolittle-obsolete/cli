/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoilerPlatesManager } from '../../BoilerPlatesManager';
import { a_boiler_plates_manager } from './a_boiler_plates_manager';

const boilerPlates = [
    {
        language:'csharp',
        name:'C# Application',
        description:'some description',
        type:'application',
        location:'/somewhere/on/the/disk',
        pathsNeedingBinding:[],
        filesNeedingBinding:[]
    },
    {
        language:'csharp',
        name:'C# BoundedContext',
        description:'some description',
        type:'boundedContext',
        location:'/somewhere/on/the/disk',
        pathsNeedingBinding:[],
        filesNeedingBinding:[]
    },
    {
        language:'javascript',
        name:'Javascript Application',
        description:'some description',
        type:'application',
        location:'/somewhere/on/the/disk',
        pathsNeedingBinding:[],
        filesNeedingBinding:[]
    },
    {
        language:'javascript',
        name:'Javacript BoundedContext',
        description:'some description',
        type:'boundedContext',
        location:'/somewhere/on/the/disk',
        pathsNeedingBinding:[],
        filesNeedingBinding:[]
    }
];

export class all_supported_boiler_plates extends a_boiler_plates_manager {
    constructor() {
        super();
        this.boilerPlates = boilerPlates;

        this.fileSystem.existsSync = sinon.stub().returns(true);
        this.fileSystem.readFileSync = sinon.stub().returns(JSON.stringify(boilerPlates));

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