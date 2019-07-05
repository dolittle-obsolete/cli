// export as namespace omelette;

// export default function omelette(cliName: string): Omelette;

// type TreeCallback = (...args: any[]) => Tree | string | TreeCallback;
// export declare type Tree = {[command: string]: Tree | string[] | TreeCallback } 
// declare class Omelette {
//     tree(tree: Tree): Omelette;
//     init(): void
// }
export as namespace omelette;

export default omelette;
declare var omelette: any


type TreeCallback = (...args: any[]) => Tree | string | TreeCallback;
export declare type Tree = {[command: string]: Tree | string[] | TreeCallback } 
declare class Omelette {
    tree(tree: Tree): Omelette;
    init(): void
}