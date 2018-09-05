/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class all_dependencies {
    constructor() {
        this.configParser = {
            parse: sinon.stub()
        }
        this.fs = {
            existsSync: sinon.stub().returns(false),
            mkdir: sinon.stub(),
            writeFile: sinon.stub()
        };
    }
}