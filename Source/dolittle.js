#!/usr/bin/env node
import args from 'args';
import global from './global';

let pkg = require('../package.json');
console.log(`Dolittle CLI v${pkg.version}\n`);

args
    .command('update', 'Update all artifacts', () => {
        global.boilerPlatesManager.update();
    })
    .command('cluster', 'Work with cluster hosting Dolittle')
    .command('create', 'Create something from one of the boilerplates')
    .command('add', 'Adds an Artifact to the Bounded Context');

args.parse(process.argv);    
let showHelpIfNeeded = () => {
    if( !args.sub.length ) args.showHelp();
}

if( global.configManager.isFirstRun || !global.boilerPlatesManager.hasBoilerPlates ) {
    if( global.configManager.isFirstRun ) global.logger.info('This is the first time you run this tool, hang on tight while we get it ready');
    else global.logger.info('There are no boiler plates, hang on tight while we get it ready');
    global.boilerPlatesManager.update().then(() => {
        console.log('\n');
        showHelpIfNeeded();
    });
} else {
    showHelpIfNeeded();
}