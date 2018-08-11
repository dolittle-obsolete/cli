#!/usr/bin/env node
import args from 'args';

args
    .command("config", "Work with the configuration of Dolittle CLI")
    .command("boundedcontext", "Work with bounded contexts")
    ;


console.log("Hello");

const flags = args.parse(process.argv);

if( args.sub.length == 0 ) args.showHelp();
