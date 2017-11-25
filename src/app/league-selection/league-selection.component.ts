import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Output,EventEmitter } from '@angular/core/';


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

  leagues = ['All','Standard','Hardcode','Harbinger','Harbinger HC'];

  leagueOnClick(league:string):void{
        console.log(league);
        this.leagueSelection.emit(league);
  }

  @Output() leagueSelection = new EventEmitter();

}
