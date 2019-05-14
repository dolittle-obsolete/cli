/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {ChoiceType} from 'inquirer';
export type NameSelectorCallback = (item: any) => string
export type ValueSelectorCallback = (item: any) => any
/**
 *
 *
 * @export
 * @param {any[]} list
 * @param {NameSelectorCallback} nameSelector
 * @param {ValueSelectorCallback} [valueSelector]
 */
export default function mapToInquirerChoices(list: any, nameSelector: NameSelectorCallback, valueSelector: ValueSelectorCallback): ChoiceType[] {
    let choices: ChoiceType[] = [];
    list.forEach((_: any) => {
        let name = nameSelector(_);
        let value = valueSelector? valueSelector(_) : name;
        choices.push(new Object({name, value}));
        
    });
    return choices;    
}
