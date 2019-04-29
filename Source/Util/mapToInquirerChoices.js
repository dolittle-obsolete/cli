/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
/**
 * 
 * @callback NameSelectorCallback
 * @param {any} item 
 * @returns {string}  
 */
/**
 * 
 * @callback ValueSelectorCallback
 * @param {any} item 
 * @returns {any}  
 */
/**
 *
 *
 * @export
 * @param {any[]} list
 * @param {NameSelectorCallback} nameSelector
 * @param {ValueSelectorCallback} [valueSelector]
 */
export default function mapToInquirerChoices(list, nameSelector, valueSelector) {
    let choices = [];
    list.forEach(_ => {
        let name = nameSelector(_);
        let value = valueSelector? valueSelector(_) : name;
        choices.push(new Object({name, value}));
        
    });
    return choices;    
}
