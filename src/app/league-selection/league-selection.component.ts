import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Output,Input, EventEmitter } from '@angular/core/';


@Component({
  selector: 'leagueSelection',
  templateUrl: './league-selection.component.html',
  styleUrls: ['./league-selection.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeagueSelectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() stashCounts;

  // Total count for stashes
  stashTotal(){
    var a = 0;
    for(let x in this.stashCounts){
      a = parseInt(this.stashCounts[x]) + a;
    }
    return a;
  }

  leagues = ['Standard','Hardcore','Abyss','Hardcore Abyss'];

  leagueOnClick(league:string):void{
        this.leagueSelection.emit(league);
  }

  @Output() leagueSelection = new EventEmitter();

}
