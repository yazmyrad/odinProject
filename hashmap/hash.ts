export class HashMap{
    capacitor: number;
    loadfactor: number;
    constructor(capacity:number = 32, lfactor:number = 0.8) {
        this.capacitor = capacity;
        this.loadfactor = lfactor;
    };

    hash(key:string): number{
        const p: number = 31;
        const m: number = 1e9 + 9;
        let hashvalue: number = 0;
        let multp: number = 1;

        for (const s of key){
            hashvalue += ((s.charCodeAt(0)-64)*multp)%m;
            multp = (multp * p)%m;
        };

        return hashvalue%this.capacitor;
    };

    set(key:string, value:string):void{
        //set value
    };


}