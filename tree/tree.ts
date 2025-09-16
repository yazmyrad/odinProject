import {
    Tree, 
    Node
} from './abstract.ts';

export class BTree extends Tree {
    //protected root!: Node;
    constructor(values:number[]){
        super(values);
    }

    protected buildTree(values: number[]):Node{
        if(values.length === 0) throw new Error("Array must have at least one value");
        
        let arr: number[] = this.sortArray(values);
        const n: number = arr.length;
        const mid: number = Math.floor(n/2);
        const midVal: number = arr[mid];
        const leftChild: Node|null = this.buildTreeRecursion(arr.slice(0, mid));
        const rightChild: Node|null = this.buildTreeRecursion(arr.slice(mid+1));

        let root: Node = {
            value: midVal,
            leftChild: leftChild,
            rightChild: rightChild,
        };

        return root;
    };

    protected sortArray(values: number[]):number[]{
        return values.sort((a:number, b:number)=>{
            if(a >= b){
                return a;
            }
            return b;
        });
    };

    protected buildTreeRecursion(arr:number[]):Node|null{
        if(arr.length === 0) return null;
        const n: number = arr.length;
        const mid: number = Math.floor(n/2);
        const midVal: number = arr[mid];

        const leftChild: Node|null = this.buildTreeRecursion(arr.slice(0, mid));
        const rightChild: Node|null = this.buildTreeRecursion(arr.slice(mid+1));

        let root: Node = {
            value: midVal,
            leftChild: leftChild,
            rightChild: rightChild,
        };

        return root;
    };

    printTree(node?:Node):void{
        const height: number = this.height(this.root.value);
        const rows: number = height+1;
        const cols: number = Math.pow(2, height+1)-1;

        let matrx: Array<string[]> = Array.from({length: rows}, ()=>
            Array(cols).fill("")
        );

        let arr: number[] = [];
        this.levelOrderForEach((node:Node)=>{
            arr.push(node.value);
            return true;
        });

        let index:number = 0;
        for(let level:number = 0; level < height; level++){
            const nodesInLevel:number = Math.pow(2, level);
            const space:number = Math.pow(2, height - level);
            const offset:number = space/2 - 1;
            for(let i:number = 0; i < nodesInLevel; i++){
                if(index >= arr.length) break;
                const value: number = arr[index++];
                if(value){
                    matrx[level][offset + i*space] = value.toString();
                }
            }
        }
        for (let i = 0; i < matrx.length; i++) {
            let line = '';
            for (let j = 0; j < matrx[i].length; j++) {
                line += matrx[i][j];
            }
            console.log(line);
        }
    }

    insertRecur(node: Node | null, value: number):Node{
        if(node === null){
            return {
                value: value,
                leftChild: null,
                rightChild: null
            }
        }else if(node.value > value){
            node.leftChild = this.insertRecur(node.leftChild, value);
        }else {
            node.rightChild = this.insertRecur(node.rightChild, value);
        }
        return node;
    };

    insert(value: number):boolean{
        if(!this.find(value)){
            this.insertRecur(this.root, value);
        }
        this.rebalance();
        return true;
    };

    getSuccessor(node: Node):Node{
        let temp!: Node;
        if(node.rightChild) temp = node.rightChild;
        while (temp?.leftChild !== null){
            temp = temp?.leftChild;
        }
        return temp;
    };

    deleteRecur(node: Node | null, value: number):Node|null{
        if(node === null){
            return node;
        }else if(node.value > value){
            node.leftChild = this.deleteRecur(node.leftChild, value);
        }else if(node.value < value){
            node.rightChild = this.deleteRecur(node.rightChild, value);
        }else{
            if(node.leftChild === null){
                return node.rightChild;
            }else if(node.rightChild === null){
                return node.leftChild;
            }else {
                let child = this.getSuccessor(node);
                node.value = child.value;
                node.rightChild = this.deleteRecur(node.rightChild, child.value);
            }
        }
        return node;
    }
    
    deleteItem(value: number):boolean{
        if(this.find(value)){
            this.deleteRecur(this.root, value);
            return true;
        }
        this.rebalance();
        return false;
    };

    findRecur(node:Node, value:number):Node|null{
        if(node.value === value){
            return this.root;
        }else if(node.value > value && node.leftChild !== null){
            return this.findRecur(node.leftChild, value);
        }else if(node.value < value && node.rightChild !== null){
            return this.findRecur(node.rightChild, value);
        }else {
            return null
        }
    }
    
    find(value: number):Node|null{
        return this.findRecur(this.root, value);
    };
    // BFS - Breadth First search is level Order traversal
    levelOrderForEach(callback:(node: Node)=>boolean):boolean{
        let que: Array<Node> = [this.root];
        while(que.length > 0){
            let node: Node | undefined = que.shift();
            if(node){
                if(!callback(node)) throw new Error("Callback function error");
                if(node.leftChild) que.push(node.leftChild);
                if(node.rightChild) que.push(node.rightChild);
            }
        }
        return true;

    };
    // DFS - Depth First search traversal are Pre/Post/In order traversal
    preOrderForEach(callback:(node: Node)=>boolean):boolean{
        return this.preOrderRecursive(this.root, callback);
    };

    preOrderRecursive(node:Node, callback:(node:Node)=>boolean):boolean{
        if(node === null){
            return true;
        }
        if(!callback(node)) return false;
        if(node.leftChild !== null) this.preOrderRecursive(node.leftChild, callback);
        if(node.rightChild !== null) this.preOrderRecursive(node.rightChild, callback);
        return true;
    };

    inOrderForEach(callback: (node: Node) => boolean): boolean {
        return this.inOrderRecursive(this.root, callback);
    };

    inOrderRecursive(node:Node, callback:(node: Node)=>boolean):boolean{
        if(node === null){
            return true;
        }
        if(node.leftChild !== null) this.inOrderRecursive(node.leftChild, callback);
        if(!callback(node)) return false;
        if(node.rightChild !== null) this.inOrderRecursive(node.rightChild, callback);
        return true;
    };
    
    postOrderForEach(callback:(node: Node)=>boolean):boolean{
        return this.postOrderRecursive(this.root, callback);
    };

    postOrderRecursive(node:Node, callback:(node:Node)=>boolean):boolean{
        if(node === null){
            return true;
        }
        if(node.leftChild !== null) this.postOrderRecursive(node.leftChild, callback);
        if(node.rightChild !== null) this.postOrderRecursive(node.rightChild, callback);
        return callback(node);
    };
    
    height(value: number): number{
        const node: Node|null = this.find(value);
        if(node!== null) return this.heightRecur(node);
        return -1;
    };

    heightRecur(node: Node): number{
        if(node === null) return -1;
        let leftHeight: number = 0;
        let rightHeight: number = 0;
        if(node.leftChild) {
            leftHeight = this.heightRecur(node.leftChild);
        }else if(node.rightChild){
            rightHeight = this.heightRecur(node.rightChild);
        }   
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    depth(node:Node|null, value: number): number{
        if(!node) return -1;
        let dist: number = -1;
        if(this.root.value === value || 
            (dist = this.depth(node.leftChild, value))>=0 ||
            (dist = this.depth(node.rightChild, value))>=0){
                return dist + 1;
            }
        return dist;
    };
    
    isBalanced():boolean{
        let curr: Node = this.root;
        while(curr){
            if(curr.leftChild != null && curr.rightChild !== null){
                if(this.height(curr.leftChild.value) - this.height(curr.rightChild.value) > 1) return false;
            }
        }
        return true;
    };
    
    rebalance():void{
        let arr: number[] = [];
        this.inOrderForEach((node:Node)=>{arr.push(node.value); return true});
        this.root = this.buildTree(arr);
    };

}