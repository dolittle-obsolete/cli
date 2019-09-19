/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IFailedCommandOutputter, ICommand, CommandContext } from '@dolittle/tooling.common.commands';
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { Command } from './internal';

export class FailedCommandOutputter implements IFailedCommandOutputter  {
    
    constructor( private _cliCommand: Command, private _outputter: ICanOutputMessages) { }
    
    output(command: ICommand, commandContext: CommandContext, error: Error): void {
        this._outputter.warn('Failed not execute command');
        if (error) this._outputter.error(`${error.message}\nCall Stack: ${error.stack}`);
        this._outputter.print(this._cliCommand.helpDoc);

    }
    
}