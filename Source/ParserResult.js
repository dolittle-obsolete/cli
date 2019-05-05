/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The representation of the parsing result from {Parser}
 *
 * @export
 * @class ParserResult
 */
export class ParserResult {
    /**
     * The first argument that does not have an option associated with it
     * @type {string}
     * @memberof ParserResult
     */
    firstArg;
    /**
     * The rest of the arguments that doesn't have an option associated with them
     * @type {string[]}
     * @memberof ParserResult
     */
    restArgs;
    /**
     * The help option. If true help shall be displayed regardless
     * @type {boolean}
     * @memberof ParserResult
     */
    help;
    /**
     * The version option. If true the version is dependent on the context. If we're in the 'add' or 'create' command group, the version of the boilerplate shall be displayed regardless.
     * @type {boolean}
     * @memberof ParserResult
     */
    version;

    /**
     * The debug option. If true debug printing occurs
     * @type {boolean}
     * @memberof ParserResult
     */
    debug;
    /**
     * The coreLang option. Overrides the desired core language of this particular command. If not set the core language will be derived from the context of the CLI.
     * 
     * Only applies to certain command groups, like 'add' and 'create'
     *
     * @type {string}
     * @memberof ParserResult
     */
    coreLang;
    /**
     * The list of extra arguments after the '--'
     *
     * @type {string[]}
     * @memberof ParserResult
     */
    extraArgs;
    /**
     * The list of extra, non defined, options
     *
     * @type {{[args: string]: any}}
     * @memberof ParserResult
     */
    extraOpts;
    
    /**
     *Creates an instance of {ParserResult}.
     * @param {string} firstArg
     * @param {string[]} restArgs
     * @param {boolean} help
     * @param {boolean} version
     * @param {boolean} debug
     * @param {string} coreLang
     * @param {string[]} extraArgs
     * @param {{[args: string]: any}} extraOpts
     * @memberof ParserResult
     */
    constructor(firstArg, restArgs, help, version, debug, coreLang, extraArgs, extraOpts) {
        this.firstArg = firstArg;
        this.restArgs = restArgs;
        this.help = help;
        this.version = version;
        this.debug = debug;
        this.coreLang = coreLang;
        this.extraArgs = extraArgs; 
        this.extraOpts = extraOpts;
    }
    
    shouldExecuteCommand() {
        return !this.help && !this.version;
    }
    /**
     * Gets the arguments in the context of a command
     *
     * @returns {string[]} The command line arguments
     * @readonly
     * @memberof ParserResult
     */
    get commandArgs() {
        return [this.firstArg, ...this.restArgs, ...this.extraArgs].filter(_ => _ !== undefined);
    }
}