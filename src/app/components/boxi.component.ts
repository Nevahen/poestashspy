import {Component, Input} from '@angular/core';
import { PoEItem } from '../models/poeitem';

@Component({
selector: 'boxi',
templateUrl: './boxi.component.html',
styleUrls: ['./boxi.component.css']
})

export class Boxi{

    data:PoEItem;
    frameType:number;
    pos = {top:0,left:0};
   
    cellSize;
    
    @Input() set itemData(itemData:PoEItem){
        this.data = itemData;              
        this.SetFrameType();
    }

    @Input() set stashType(value){
        
        if(value == "QuadStash"){
            this.cellSize = 23.75;           
        }
        else{
            this.cellSize =47.5;            
        }
        this.pos = this.CalculatePosition(this.data);  
    }

    SetFrameType(){
        this.frameType = this.data.frameType;
    }


    StripTags(str:string):string{
        let s= str.replace('<<set:MS>><<set:M>><<set:S>>','');
        return s;
    }


    CalculatePosition(itemData){
       return {
            top :this.data.y * this.cellSize,
            left: this.data.x * this.cellSize + (this.cellSize * this.data.w)
        };              
    }
}