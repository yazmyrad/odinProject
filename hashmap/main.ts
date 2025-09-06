import { HashMap } from "./hash";

const hash = new HashMap(4);

hash.set("HI", "Salam");
hash.set("jss", "jsdf");
hash.set("yhlas", "yazmrd");

console.log(hash.get("HI"));
console.log(hash.get("yhlas"));

hash.set("H2I", "Salam");
console.log(hash.get("HI"));
