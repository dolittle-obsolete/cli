/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, argumentUserInputType, ICanResolveDependencies, IDependencyRuleFor } from '@dolittle/tooling.common.dependencies';
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { ParserResult } from './index';


export class ArgumentsDependencyResolver implements ICanResolveDependencies  {
    
    constructor(private _parsingResult: ParserResult, private _outputter: ICanOutputMessages) { }
    
    canResolve(dependency: IDependency) {
        return  (dependency as any).userInputType !== undefined && (dependency as any).userInputType === argumentUserInputType;
    }
    
    async resolve(context: any, dependencies: IDependency[], additionalRules: IDependencyRuleFor<IDependency>[], destinationPath?: string, coreLanguage?: string): Promise<any> {
        
    }

    
}