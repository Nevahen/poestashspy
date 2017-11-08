import {Component, Input} from '@angular/core';

@Component({
selector: 'boxi',
templateUrl: './boxi.component.html',
styleUrls: ['./boxi.component.css']
})

export class Boxi{
    name = "2222";
    desc = "asjdlkasjd";

    @Input() pos;
    @Input() itemData;
}