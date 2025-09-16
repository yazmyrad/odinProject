export interface Node {
    value:number,
    leftChild: Node | null,
    rightChild: Node | null
};

export abstract class Tree {
    protected root: Node;

    constructor(values: number[]){
        this.root = this.buildTree(values);
    };

    protected abstract buildTree(values: number[]):Node;
    abstract printTree(node: Node, prefix: string, isLeft:boolean):void;
    abstract insert(value: number):boolean;
    abstract deleteItem(value: number):boolean;
    abstract find(value: number):Node|null;
    abstract levelOrderForEach(callback:(node: Node)=>boolean):boolean;
    abstract preOrderForEach(callback:(node: Node)=>boolean):boolean;
    abstract postOrderForEach(callback:(node: Node)=>boolean):boolean;
    abstract inOrderForEach(callback:(node: Node)=>boolean):boolean;
    abstract height(value: number): number;
    abstract depth(node:Node, value: number): number;
    abstract isBalanced():boolean;
    abstract rebalance():void;
}