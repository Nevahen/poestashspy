import {PoEItem} from "./poeitem";


export class Stash{

    itemData: PoEItem[];
    stashType: string;
    stashID: number;
    league:string;

    GetStashType():string{
        return this.stashType;
    }

    GetItem(i:number):PoEItem{        
        if(this.itemData[i]){
            return this.itemData[i];
        }
        else
        {
            throw new Error("Index Out of Bounds");
        }
    }
}

