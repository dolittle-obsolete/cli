#!/usr/bin/env node
import args from 'args';

args
    .command('cluster', 'Work with cluster hosting Dolittle')
    ;


const flags = args.parse(process.argv);

if( args.sub.length == 0 ) args.showHelp();
