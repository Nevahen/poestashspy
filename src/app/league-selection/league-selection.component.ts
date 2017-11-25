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

  leagues = ['Standard','Hardcore','Harbinger','Harbinger HC','10 Day Mayhem (ORE004)', '10 Day Mayhem HC (ORE005)'];

  leagueOnClick(league:string):void{
        console.log(this.stashCounts);
        this.leagueSelection.emit(league);
  }

  @Output() leagueSelection = new EventEmitter();

}
