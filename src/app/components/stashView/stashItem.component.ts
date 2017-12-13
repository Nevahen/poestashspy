import { Component, Input } from "@angular/core";
import { PoEItem } from "../../models/poeitem";

@Component({
    selector: "stashitem",
    templateUrl: "./stashItem.component.html",
    styleUrls: ["./stashItem.component.css"]
})

export class StashItem{
    
    cellSize;
    _stashType:string;
    _itemdata:PoEItem;

    get itemData(){
        return this._itemdata;
    }

    @Input()
    set itemData(itemdata:PoEItem){
        this._itemdata = itemdata;
        this.CalcSpecialLocationX();
        this.CalcSpecialLocationY();
    }
    
    get stashType(){
        return this._stashType;       
    }

    @Input()
    set stashType(value: string){        

        this._stashType = value;

        if(value === "QuadStash"){
            this.cellSize = 23.75;
            this.itemData.icon = this.itemData.icon.replace("scaleIndex=0","scaleIndex=1");
        }
        else{
            this.cellSize =47.5;
        }
     }

    CalcSpecialLocationX(){
        
        return Math.floor(this.itemData.itemIndex / 12) * this.cellSize;
    }
    CalcSpecialLocationY(){
        
        return Math.floor(this.itemData.itemIndex % 12) * this.cellSize;
    }
}