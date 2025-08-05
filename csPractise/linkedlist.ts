class TheNode {
    value: string;
    constructor(value: string = ''){
        this.value = value;
    }
    nextNode: TheNode;
};

export class LinkedList {
    headNode: TheNode = new TheNode();
    append(value: string): void {
        this.headNode.nextNode = new TheNode(value);
    };

    prepend(value: string): void {
        let tempNode = new TheNode(value);
        tempNode.nextNode = this.headNode;
        this.headNode = tempNode;
    };  

    size(): number {
        let number: number = 0;
        while (this.headNode.nextNode){
            number += 1;
        };

        return number;
    };


};