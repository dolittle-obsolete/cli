/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


import { CommandManager } from "./CommandManager";
import { Inquirer } from "../Inquirer";
import { Outputter } from "../Outputter";
import showHelp from "../Actions/showHelpAction";
import { ParserResult } from "../ParserResult";
import { CliContext } from "../CliContext";

 /**
 * The base class of a command
 *
 * @export
 * @class Command
 */
export class Command {
    
    /**
     * The name of the command
     *
     * 
     * @type {string}
     * @memberof Command
     */
    name;
    /**
     * The group of commands the command belongs to, if any
     *
     * 
     * @type {string}
     * @memberof Command
     */
    group;
    /**
     * The description of the command. Printed out in the help text
     *
     * 
     * @type {string}
     * @memberof Command
     */
    description;
    /**
     * The optional help text that is printed as a addition to the description and the usage
     *
     * 
     * @type {string}
     * @memberof Command
     */
    help;
    /**
     * The usage text used 
     *
     * @type {string}
     * @memberof Command
     */
    usage;
    /**
     * The arguments for this particular command
     * @type {string[]}
     * @memberof Command
     */
    args;
    /**
     * The short description of the command. If none is specified the short description is the normal description
     *
     * @memberof Command
     */
    shortDescription;

    /**
     * Creates an instance of {Command}.
     * @param {string} name
     * @param {string} description
     * @param {string} usage
     * @param {string?} group
     * @param {string?} help
     * @param {string[]?} args
     * @memberof Command
     */
    constructor(name, description, usage, group = undefined, help = undefined, args = [], shortDescription = undefined) {
        this.name = name;
        this.group = group;
        this.description = description;
        this.usage = usage;
        this.help = help;
        this.args = args;
        this.shortDescription = shortDescription? shortDescription : description;
    }
    /**
     * The action performed when the command is invoked by the CLI
     *
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     * @memberof Command
     */
    async action(parserResult, context) { showHelp(this, parserResult, context) }

    get helpDocs() {
        let res = [`Usage: ${this.usage}`, '', `    ${this.description}`, '', this.help? this.help : ''];
        return res.join('\n');
    }
    /**
     * Returns the JSON object representation of a {Command}
     *
     * @memberof Command
     */
    toJson() {
        return {
            name: this.name,
            group: this.group,
            description: this.description,
            help: this.help,
            usage: this.usage,
        }
    }
}