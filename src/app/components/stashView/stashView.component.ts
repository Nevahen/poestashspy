import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Stash } from '../../models/stash.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router/';
import { PoEItem } from '../../models/poeitem';

@Component({
    selector: "stashview",
    templateUrl: "./stashView.component.html",
    styleUrls: ["./stashView.component.css"]
})

export class StashView{

        constructor(
            private route: ActivatedRoute,
            private router: Router,
            private apiService: ApiService
        ){}

        ngOnInit(){

            let account = this.route.snapshot.paramMap.get('account');

            // If coming from account search use account name as parameter
            // When stashes are fetched load 1st tab via callback
            if(account){
            this.GetLatestStashes(account, () => {
                //NOTICE: Maybe should expect zero stashes if we change our system.
                this.GetStash(this.stashes[0].stashID);
            });         
            }
            else{
            // get random stash
            this.GetStash(1);                   
            this.GetLatestStashes();
            }           
        }

    /*
    stashes = list of all resulted stashes
    selectedStash: 
    items: Items of selectedStash
    selectedItem: Item currently hovered
    */

    stashes:Stash[];
    stashCounts = {};
    filteredStashes = null;
    selectedStash : Stash;
    items : PoEItem[];

    selectedItem = null;    

    SelectItem(item){
        this.selectedItem = item;        
    }

    // TODO:: MODEL THIS UGLY SHIT = ITEMS AND STASH
    GetStash(id:number):void{
        this.apiService.getStashByID(id)
        .subscribe((stash) => {
            this.selectedStash = stash['itemData'];
            this.items = this.selectedStash[0].itemData;        
        });  
    }

    GetLatestStashes(account?, cb?:Function){

        this.apiService.getLatestStashes(account)
        .subscribe((stashes:Stash[]) => {            
            this.stashes = stashes['stashes'];
            this.filteredStashes = this.stashes;
            this.CountStashes();

            // Callback when stashes fetched
            if(cb){
                cb();
            }
        })
    }


    CountStashes(){
        for(let stash in this.stashes){
            this.stashCounts[this.stashes[stash].league] = (this.stashCounts[this.stashes[stash].league] +1) || 1;            
        }
    }


    /* Listen league selector component, when user selects
    All or specific league, filter accordingly
    */
    handleLeagueSelection(league){
        
        if(league == 'All'){
            this.filteredStashes = Object.assign([], this.stashes);
        }
        else{
            this.filterStashes(league);
        }      
    }

    filterStashes(league){
        
        this.filteredStashes = Object.assign([], this.stashes);

        for(var i = this.filteredStashes.length; i--;){
            if (this.filteredStashes[i]['league'] != league){
                this.filteredStashes.splice(i,1);
            }
        }
    

    }
}