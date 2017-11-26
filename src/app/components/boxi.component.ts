import {Component, Input} from '@angular/core';

@Component({
selector: 'boxi',
templateUrl: './boxi.component.html',
styleUrls: ['./boxi.component.css']
})

export class Boxi{

    data;
    pos = {}
   
    cellSize;
    
    @Input() set itemData(itemData){
        this.data = itemData;              
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

    StripTags(str:string):string{
        let s= str.replace('<<set:MS>><<set:M>><<set:S>>','');
        return s;
    }


    CalculatePosition(itemData){
       return {top:this.data.y*this.cellSize, left:this.data.x*this.cellSize+(this.cellSize*this.data.w)};              
    }
}