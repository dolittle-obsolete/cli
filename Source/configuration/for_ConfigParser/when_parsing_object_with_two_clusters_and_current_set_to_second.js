/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ConfigParser } from '../ConfigParser';

describe("when parsing object with two clusters and current set to second", () => {
    let reader = null;
    let result = null;
    let configuration = {
        clusters: [
            { name: 'first', url:'http://first', token:'first token' },
            { name: 'second', url:'http://second', token:'second token' }
        ],
        current: 'second'
    };

    (beforeEach => {
        reader = new ConfigParser();
        result = reader.parse(configuration);
    })();

    it("should return an instance", () => expect(result).to.not.be.undefined);
    it("should not hold two clusters", () => result.clusters.length.should.equal(2));
    it("should parse first clusters name", () => result.clusters[0].name.should.equal(configuration.clusters[0].name));
    it("should parse first clusters url", () => result.clusters[0].url.should.equal(configuration.clusters[0].url));
    it("should parse first clusters token", () => result.clusters[0].token.should.equal(configuration.clusters[0].token));
    it("should parse second clusters name", () => result.clusters[1].name.should.equal(configuration.clusters[1].name));
    it("should parse second clusters url", () => result.clusters[1].url.should.equal(configuration.clusters[1].url));
    it("should parse second clusters token", () => result.clusters[1].token.should.equal(configuration.clusters[1].token));
    it("should set current cluster instance to second", () => result.current.should.equal(result.clusters[1]));
});