#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { initializer } from '@dolittle/tooling.common.host';
run();

async function run() {
    await initializer.initialize();
    await import('./cli');
}
