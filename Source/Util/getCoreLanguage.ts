/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ProjectConfigObject } from '@dolittle/tooling.common';
import { ParserResult, CoreLanguageNotFound } from '../index';

/**
 * Gets the core language in the context of a command
 *
 * @export
 * @param {ParserResult} parserResult
 * @param {any} projectConfigObject The actual object of the ProjectConfig
 * @returns {string} The core programming language
 */
export function getCoreLanguage(parserResult: ParserResult, projectConfigObject: ProjectConfigObject): string {
    try {
        let language = parserResult.coreLang? parserResult.coreLang : projectConfigObject.coreLanguage;
        if (!language) throw new CoreLanguageNotFound();
        return language;
    
    } catch(error) {
        throw new CoreLanguageNotFound();
    } 
}
