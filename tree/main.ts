import {
    BTree
} from './tree.ts';
import {
    Node
} from './abstract.ts';

const btree: BTree = new BTree([1, 2, 3, 4, 5, 6, 7, 8]);
btree.insert(9);
btree.printTree();
btree.deleteItem(3);
btree.printTree();
