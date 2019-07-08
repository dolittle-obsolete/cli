/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator, BusyIndicatorNotCreated } from "@dolittle/tooling.common.utilities";
import ora from "ora";

export class BusyIndicator implements IBusyIndicator {
    private _indicator?: ora.Ora;
    
    get text() {
        this.throwIfNotCreated();
        return this._indicator!.text; 
    }

    set text(text: string) {
        this.throwIfNotCreated();
        this._indicator!.text = text;
    }

    get isBusy() {
        return this._indicator !== undefined && this._indicator.isSpinning;
    }

    createNew(text?: string) {
        this._indicator = ora(text);
        return this;
    }
    start(text?: string) {
        this.throwIfNotCreated();
        this._indicator!.start(text);
        return this;
    }
    stop() {
        this.throwIfNotCreated();
        this._indicator!.stop();
        this._indicator = undefined;
        return this;
    }
    stopAndPersist(text?: string) {
        this.throwIfNotCreated();
        this._indicator!.stopAndPersist({text});
        this._indicator = undefined;
        return this;
    }
    succeed(text?: string) {
        this.throwIfNotCreated();
        this._indicator!.succeed(text);
        this._indicator = undefined;
        return this;
    }
    fail(text?: string) {
        this.throwIfNotCreated();
        this._indicator!.fail(text);
        this._indicator = undefined;
        return this;
    }
    info(text?: string) {
        this.throwIfNotCreated();
        this._indicator!.info(text);
        this._indicator = undefined;
        return this;
    }
    warn(text?: string) {
        this.throwIfNotCreated();
        this._indicator!.warn(text);
        this._indicator = undefined;
        return this;
    }

    private throwIfNotCreated(){
        if (this._indicator === undefined) throw new BusyIndicatorNotCreated('Cannot perform an action on ora busy indicator before it has been created');
    }
}