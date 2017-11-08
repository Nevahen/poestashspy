import { Component, Input } from "@angular/core";

@Component({
    selector: "stashitem",
    templateUrl: "./stashItem.component.html",
    styleUrls: ["./stashItem.component.css"]
})



export class StashItem{

    @Input() itemData;
    cellSize =47.5;

}