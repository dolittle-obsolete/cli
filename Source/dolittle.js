#!/usr/bin/env node
import args from 'args';
import global from './global';

args
    .command('update', 'Update all artifacts', () => {
        global.boilerPlatesManager.update();
    })
    .command('cluster', 'Work with cluster hosting Dolittle')
    .command('create', 'Create something from one of the boilerplates')
    ;

const flags = args.parse(process.argv);

if( args.sub.length == 0 ) args.showHelp();
