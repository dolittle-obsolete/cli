/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, argumentUserInputType, ICanResolveDependencies, IDependencyRuleFor, IPromptDependency, CannotResolveDependency, RuleNotRespected } from '@dolittle/tooling.common.dependencies';
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { ParserResult } from './internal';

export class ArgumentsDependencyResolver implements ICanResolveDependencies  {

    constructor(private _parsingResult: ParserResult, private _outputter: ICanOutputMessages) { }

    canResolve(dependency: IDependency) {
        return  (dependency as any).userInputType === argumentUserInputType;
    }

    async resolve(context: any, dependencies: IPromptDependency[], additionalRules: IDependencyRuleFor<IDependency>[], destinationPath?: string, coreLanguage?: string): Promise<any> {
        dependencies.forEach(_ => {
            let value: any = undefined;
            if (_.optional) {
                if (! this._parsingResult.extraOpts.hasOwnProperty(_.name)) return;
                value = this._parsingResult.extraOpts[_.name];
            }
            else {
                value = this._parsingResult.firstArg;

                this._parsingResult.firstArg = this._parsingResult.restArgs.shift();
            }

            if (value === undefined) throw new CannotResolveDependency(_);

            _.rules.forEach(rule => {
                if (! rule.isRespected(value)) throw new RuleNotRespected(_, rule);

            });
            context[_.name] = value;
        });

        return context;
    }

}
