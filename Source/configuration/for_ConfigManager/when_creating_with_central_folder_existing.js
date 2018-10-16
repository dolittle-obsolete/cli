/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { all_dependencies } from './given/all_dependencies';
import { ConfigManager } from '../ConfigManager';


describe('when creating with central folder existing', () => {
    var context = null;

    (beforeEach => {
        context = new all_dependencies();
        context.fs.existsSync = sinon.stub().returns(true);
        context.configManager = new ConfigManager(context.fs, context.configParser, logger);
    })();

    it('should not be considered a first run', () => context.configManager.isFirstRun.should.be.false);
});