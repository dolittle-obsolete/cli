/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_bounded_context_json_with_everything {
    constructor() {
        this.application = 'b406107e-0a10-fe54-8ae3-cd32d3408c17';
        this.boundedContext = '78b89381-da90-7682-9430-e216d7f802ae';
        this.boundedContextName = 'TheBoundedContext';
        this.backendLanguage = 'csharp';
        this.boundedContextJson = 
            `{
                "application": "${this.application}",
                "boundedContext": "${this.boundedContext}",
                "boundedContextName": "${this.boundedContextName}",
                "backend": {
                  "language": "${this.backendLanguage}"
                }
              }`;
    }
}