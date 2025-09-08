interface hashNode {
    key: string;
    value: string;
};

export class HashMap{
    protected capacitor: number;
    protected readonly loadfactor: number;
    protected bucket: (hashNode | undefined)[];
    private count: number;

    constructor(capacity:number = 32, lfactor:number = 0.8) {
        this.capacitor = capacity;
        this.loadfactor = lfactor;
        this.bucket = new Array<hashNode | undefined>(this.capacitor).fill(undefined);
        this.count = 0;
    };

    protected hash(key:string): number{
        const p: number = 53;
        const m: number = 1e9 + 9;
        let hashvalue: number = 0;
        let multp: number = 1;

        for (const s of key){
            hashvalue = (hashvalue + s.charCodeAt(0)*multp)%m;
            multp = (multp * p)%m;
        };

        hashvalue = Math.abs(hashvalue); 
        return (hashvalue ^ (hashvalue>>>16))&0x7fffffff;
    };

    protected getIndex(hash:number, capacity: number):number {
        return hash%capacity;
    };

    protected resize():void {
        const newCapacity = this.capacitor * 2;
        let newBucket: hashNode[] = new Array<hashNode>(newCapacity);
        for(let i=0; i<this.capacitor; i++){
            let currentNode: hashNode | undefined = this.bucket[i];
            if(currentNode){
                const newIndex: number = this.getIndex(
                    this.hash(currentNode.key),
                    newCapacity
                );

                newBucket[newIndex] = currentNode;
            }

        };
        this.capacitor = newCapacity;
        this.bucket = newBucket;
    };

    protected reassign(key: string, value:string, index: number){
        this.bucket[index] = {
            key: key,
            value: value
        };
    };

    has(key: string):boolean {
        const index: number = this.getIndex(this.hash(key), this.capacitor);
        const node: hashNode|undefined = this.bucket[index];

        if(node && node.key === key){
            return true;
        }
        return false;
    };

    set(key:string, value:string):void{
        let keyHash: number = this.hash(key);
        const keyIndex: number = this.getIndex(keyHash, this.capacitor);
        console.log(key, this.has(key));
        if(this.has(key)){
            this.reassign(key, value, keyIndex);
        }else if(keyIndex >= 0 && keyIndex < this.capacitor && this.count + 1 <= this.capacitor * this.loadfactor){
            const node: hashNode = {
                key: key,
                value: value
            };
            this.bucket[keyIndex] = node;
            this.count += 1;
        }else {
            this.resize();            
        }
    };

    get(key: string):hashNode|undefined|string{
        const indx: number = this.getIndex(
            this.hash(key),
            this.capacitor
        );
        
        if(!this.has(key)){
            return "The key does not exist!";
        }
        return this.bucket[indx];
    };

    remove(key: string): boolean {
        if(this.has(key)){
            const keyHash: number = this.hash(key);
            const keyIndex: number = this.getIndex(keyHash, this.capacitor);
            this.bucket[keyIndex] = undefined;
            this.count -= 1;
            return true;
        }

        return false;
    };

    length():number{
        let count:number = 0;
        for(const val of this.bucket){
            if(val){
                count++;
            }
        }

        return count;
    };

    clear():void {
        this.bucket = new Array<hashNode | undefined>(this.capacitor).fill(undefined);
        this.count = 0;
    };

    keys():string[]{
        let keys: string[] = [];
        for(let val of this.bucket){
            if(val){
                keys.push(val.key);
            }
        }

        return keys;
    };

    values():string[]{
        let values: string[] = [];
        for(let val of this.bucket){
            if(val){
                values.push(val.value);
            }
        }

        return values;     
    };

    entries(): [string[]]{
        let entry: [string[]] = [[]];
        for(let val of this.bucket){
            if(val){
                entry.push([
                    val.key,
                    val.value
                ]);
            }
        }

        return entry; 
    };

}