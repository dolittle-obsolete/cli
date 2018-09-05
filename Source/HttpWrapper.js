/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import url from 'url';
import https from 'https';
import * as streams from 'stream';

/**
 * Represents a wrapper for working with HTTP calls
 */
export class HttpWrapper {

    /**
     * Get from a specific source with a specific mimetype and output into a stream
     * @param {string} source 
     * @param {string} mimeType 
     * @param {stream} stream 
     * @returns {Promise} A promise that can be continued
     */
    get(source, mimeType, stream) {
        let promise = new Promise((resolve, reject) => {
            let host = url.parse(source).host;
            let path = url.parse(source).pathname;

            let options = {
                host: host,
                path: path,
                headers: {
                    "Content-Type": mimeType,
                    "User-Agent": "request"
                }
            };

            https.get(options, function (res) {
                res.on("data", function (chunk) {
                    if (stream) {
                        stream.write(chunk);
                    }
                }).on("end", function () {
                    if (stream) {
                        stream.end();
                    }
                    resolve();
                });
            });
        });
        return promise;
    }

    /**
     * Get text from a specific source with a specific mimetype
     * @param {*} source 
     * @param {*} mimetype 
     * @returns {Promise} A promise that can be continued with the result
     */
    getText(source, mimetype) {
        let promise = new Promise((resolve, reject) => {
            if (!mimetype) mimetype = "text";

            let stream = new streams.PassThrough();
            let text = "";
            stream.on("data", (chunk) => text += chunk);
            stream.on("end", () => resolve(text));

            this.get(source, mimetype, stream);
        });
        return promise;
    }

    /**
     * Get HTML from a specific source with a specific mimetype
     * @param {*} source 
     * @returns {Promise} A promise that can be continued with the result
     */
    getHtml(source) {
        return this.getText(source, "text/html");
    }

    /**
     * Get JSON from a specific source with a specific mimetype
     * @param {*} source 
     * @returns {Promise} A promise that can be continued with the result
     */
    getJson(source) {
        return this.getText(source, "application/json");
    }
}
