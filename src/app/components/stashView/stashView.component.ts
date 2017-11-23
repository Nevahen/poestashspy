import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Stash } from '../../models/stash.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router/';

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
                this.GetStash(this.stashes[0]['stashID']);
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

    stashes = null;
    selectedStash : any;
    items : any;

    selectedItem = null;    

    SelectItem(item){
        this.selectedItem = item;        
    }

    // TODO:: MODEL THIS UGLY SHIT = ITEMS AND STASH
    GetStash(id:number):void{
        this.apiService.getStashByID(id)
        .subscribe((stash: Stash) => {
            //Ignore special stashes for now..
            if(stash.itemData[0]['stashType'] != 'PremiumStash'){
                return;
            }
            console.log(stash);
            this.selectedStash = stash.itemData[0];
            this.items = this.selectedStash['itemData'];        
        });  
    }

    GetLatestStashes(account?, cb?:Function){

        this.apiService.getLatestStashes(account)
        .subscribe((stashes) => {            
            this.stashes = stashes['stashes'];
            console.log(stashes);

            // Callback when stashes fetched
            if(cb){
                cb();
            }
        })

    }

    GetPosition():object{        
        var position = {
            top: this.selectedItem.y * 49,
            left: this.selectedItem.x * 48 + 60
        }
        return position;        
    }
}