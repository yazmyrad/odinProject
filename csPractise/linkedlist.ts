class TheNode {
    value: string;
    nextNode: TheNode | null;

    constructor(value: string = ''){
        this.value = value;
        this.nextNode = null;
    }
};

export class LinkedList {
    headNode: TheNode;
    constructor(value:string){
        this.headNode = new TheNode(value);
    }
    append(value: string): void {
        let temp: TheNode = this.headNode;
        while(temp.nextNode){
            temp = temp.nextNode;
        }
        temp.nextNode = new TheNode(value);
    };

    prepend(value: string): void {
        let tempNode: TheNode = new TheNode(value);
        tempNode.nextNode = this.headNode;
        this.headNode = tempNode;
    };  

    size(): number {
        let number: number = 1;
        let temp: TheNode = this.headNode;
        while (temp.nextNode){
            number += 1;
            temp = temp.nextNode;
        };

        return number;
    };

    print(): void {
        let temp: TheNode | null = this.headNode;
        let output: string = '->';
        while(temp){
            output += "(" + temp.value + ")->";
            temp = temp.nextNode;
       }
       console.log(output);
    };

    head(): TheNode {
        return this.headNode;
    };

    tail(): TheNode {
        let temp: TheNode = this.headNode;
        while(temp.nextNode){
            temp = temp.nextNode;
        }

        return temp;
    };

    at(index: number): TheNode {
        let temp: TheNode = this.headNode;
        if(index == 1){
            return temp;
        };
        index -= 1;
        while(temp.nextNode && index > 0){
            temp = temp.nextNode;
            index -= 1;
        };

        return temp;
    };

    pop(): void {
        if(this.headNode.nextNode == undefined){
            console.log("Nothing to pop!");
            return;
        };
        let temp: TheNode = this.headNode;
        let prev: TheNode | null = null;
        while(temp.nextNode){
            prev = temp;
            temp = temp.nextNode;
        };

        if(prev){
            prev.nextNode = null;
        }
    };

    contains(value: string): boolean {
        let temp: TheNode = this.headNode;

        while(temp.value != value && temp.nextNode){
            temp = temp.nextNode;
        };
        if(temp.nextNode == undefined && temp.value != value){
            return false;
        }
        return true;
    };

    find(value: string): number | null{
        let temp: TheNode = this.headNode;

        let index: number = 1;
        while(temp.nextNode){
            if(temp.value === value){
                return index
            }
            temp = temp.nextNode;
            index += 1;
        };
        return null;
    };
};