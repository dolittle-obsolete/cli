/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_boiler_plates_manager } from './given/a_boiler_plates_manager';

describe('when creating instance with paths needing binding where paths are separated with backslash', () => {
    const fileNeedingBinding = 'c:\\Somwhere\\On\\{{the}}\\Harddrive\\{{file}}.txt';
    let context = null;
    let bindingContext = {
        the: 'the',
        file: 'somefile'
    };
    let expectedResult = `c:\\Somwhere\\On\\${bindingContext.the}\\Harddrive\\${bindingContext.file}.txt`;
    let destination = "";
    let boilerPlate = {
        pathsNeedingBinding: [
            fileNeedingBinding
        ],
        filesNeedingBinding: []
    };


    (beforeEach => {
        context = new a_boiler_plates_manager();

        context.folders.copy = sinon.stub();
        context.fileSystem.renameSync = sinon.stub();

        context.boilerPlatesManager.createInstance(boilerPlate, destination, bindingContext);
    })();
   
    it('should expand bindings with correct values and rename path accordingly', () => context.fileSystem.renameSync.should.be.calledWith(boilerPlate.pathsNeedingBinding[0],expectedResult));
});