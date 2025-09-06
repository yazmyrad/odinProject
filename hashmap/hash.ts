interface hashNode {
    key: string;
    value: string;
};

export class HashMap{
    private capacitor: number;
    protected readonly loadfactor: number;
    private bucket: hashNode[];
    private count: number;

    constructor(capacity:number = 32, lfactor:number = 0.8) {
        this.capacitor = capacity;
        this.loadfactor = lfactor;
        this.bucket = new Array<hashNode>(this.capacitor);
        this.count = 0;
    };

    private hash(key:string): number{
        const p: number = 31;
        const m: number = 1e9 + 9;
        let hashvalue: number = 0;
        let multp: number = 1;

        for (const s of key){
            hashvalue += ((s.charCodeAt(0)-64)*multp)%m;
            multp = (multp * p)%m;
        };

        return Math.abs(hashvalue);
    };

    protected getIndex(hash:number, capacity: number):number {
        return hash%capacity;
    };

    protected resize():void {
        const newCapacity = this.capacitor * 2;
        let newBucket: hashNode[] = new Array<hashNode>(newCapacity);
        for(let i=0; i<this.capacitor; i++){
            let currentNode: hashNode = this.bucket[i];
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


    set(key:string, value:string):void{
        let keyHash: number = this.hash(key);
        const keyIndex: number = this.getIndex(keyHash, this.capacitor);
        if(keyIndex >= 0 && keyIndex < this.capacitor && this.count + 1 <= this.capacitor * this.loadfactor){
            const node: hashNode = {
                key: key,
                value: value
            };
            this.bucket[keyIndex] = node;
            this.count += 1;
        }else if (this.count + 1 > this.capacitor * this.loadfactor){
            this.resize();            
        }
    };

    get(key: string):hashNode|string{
        const indx: number = this.getIndex(
            this.hash(key),
            this.capacitor
        );
        console.log(this.capacitor, this.bucket);
        
        if(!this.bucket[indx]){
            return "The key doesn't exist!";
        }
        return this.bucket[indx];
    }

}