import { Component, Input } from '@angular/core';
import { PoEItem } from '../models/poeitem';

@Component({
    selector: 'boxi',
    templateUrl: './boxi.component.html',
    styleUrls: ['./boxi.component.css']
})

export class Boxi {

    data: PoEItem;
    frameType: string;
    pos = { top: 0, left: 0 };

    cellSize;

    @Input() set itemData(itemData: PoEItem) {
        this.data = itemData;
        this.frameType = this.GetFrameTypeString();
    }

    @Input() set stashType(value) {

        if (value == "QuadStash") {
            this.cellSize = 23.75;
        }
        else {
            this.cellSize = 47.5;
        }
        this.pos = this.CalculatePosition(this.data);
    }

    GetFrameTypeString():string{        
                switch (this.data.frameType) {        
                    case 0: {
                        return "normal";
                    }        
                    case 1: {
                        return "magic";
                    }        
                    case 2: {
                        return "rare";
                    }        
                    case 3: {
                        return "unique";
                    }
                    case 4: {
                        return "gem";
                    }
                    case 5: {
                        return "currency";
                    }
                    case 6: {
                        return "divination-card";
                    }
                    case 7: {
                        return "quest-item";
                    }
                    case 8: {
                        return "prophecy";
                    }
                    case 9: {
                        return "relic";
                    }
                    default:{
                        return "unknown";
                    }
                }        
            }

    StripTags(str: string): string {
        let s = str.replace('<<set:MS>><<set:M>><<set:S>>', '');
        return s;
    }


    CalculatePosition(itemData) {
        return {
            top: this.data.y * this.cellSize,
            left: this.data.x * this.cellSize + (this.cellSize * this.data.w)
        };
    }
}