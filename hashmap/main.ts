import { HashMap } from "./hash";

const hash = new HashMap(32, 0.75);

hash.set("apple", "red");
hash.set("banana", "yellow");
hash.set("carrot", "orange");
hash.set("dog", "brown");
hash.set("tiger", "strong");
hash.set("me", "shy");
hash.set("you", "beautiful");
hash.set("country", "powerful");
hash.set("wheather", "sunny");
hash.set("book", "heavy");
hash.set("phone", "new");
hash.set("company", "interesting");

hash.set("book", "thick");

hash.set("moon", "far away");
console.log(hash.entries());

hash.remove("book");
console.log(hash.length());

hash.clear();

console.log(hash.entries());