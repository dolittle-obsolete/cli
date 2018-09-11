/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_config_manager } from './given/a_config_manager';

describe('when creating without central folder not existing', () => {
    var context = null;

    (beforeEach => {
        context = new a_config_manager();
    })();

    it('should create the folder for the central location', () => context.fs.mkdir.should.be.calledWith(context.configManager.centralFolderLocation));    
    it('should write initial config file', () => context.fs.writeFile.should.be.calledWith(context.configManager.configFileLocation));
    it('should be considered a first run', () => context.configManager.isFirstRun.should.be.true);
});