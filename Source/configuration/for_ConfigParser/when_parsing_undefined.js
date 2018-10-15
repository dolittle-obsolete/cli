/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ConfigParser } from '../ConfigParser';

describe('when parsing undefined', () => {
    let reader = null;
    let result = null;

    (beforeEach => {
        reader = new ConfigParser();
        result = reader.parse();
    })();

    it('should return an instance', () => expect(result).to.not.be.undefined);
    it('should not hold any clusters', () => result.clusters.length.should.equal(0));

});