import { Component, Input } from "@angular/core";
import { PoEItem } from "../../models/poeitem";

@Component({
    selector: "stashitem",
    templateUrl: "./stashItem.component.html",
    styleUrls: ["./stashItem.component.css"]
})

export class StashItem{
    
    cellSize;

    @Input() itemData:PoEItem;
    @Input() set stashType(value: string){
        
        if(value === "QuadStash"){
            this.cellSize = 23.75;
            this.itemData.icon = this.itemData.icon.replace("scaleIndex=0","scaleIndex=1");
        }
        else{
            this.cellSize =47.5;
        }

    }
 

}