import { LinkedList } from "./linkedlist";

const list = new LinkedList("dog");

list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.print();

list.prepend('horse');

list.print();

console.log("Size ", list.size());

console.log("Head ", list.head());

console.log("Tail ", list.tail());

console.log("Node at 4: ", list.at(4));

console.log("Contains ", "parrot", list.contains('parrot'));

console.log("Contains ", "me", list.contains('me'));

console.log("Find ", 'parrot ', list.find("parrot"));

console.log("Find ", 'me ', list.find("me"));

list.pop();

list.print();

