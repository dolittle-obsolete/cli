/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ParserResult } from '../index';

/**
 * Gets the core language in the context of a command
 *
 * @export
 * @param {ParserResult} parserResult
 * @param {any} projectConfigObject The actual object of the ProjectConfig
 * @returns {string} The core programming language
 */
export function getCoreLanguage(parserResult: ParserResult, projectConfigObject: any): string {
    try {
        let language = parserResult.coreLang? parserResult.coreLang : projectConfigObject.coreLanguage;
        if (!language) throw CoreLanguageNotFoundError.new;
        return language;
    
    } catch(error) {
        throw CoreLanguageNotFoundError.new;
    } 
}

export class CoreLanguageNotFoundError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, CoreLanguageNotFoundError);
    }

    static get new() {
        return new CoreLanguageNotFoundError('Could not get core language');
    } 
}