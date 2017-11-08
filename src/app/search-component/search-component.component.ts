import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponentComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.recentAccounts()
    .subscribe((results:any) =>{
      this.accounts = results.accounts;
    
    })
  }

  public preventDefault(event: Event): void {
    event.preventDefault();
  }

  accounts;

  hasSearched = false;

  searchAccount(search){
    
    
    this.apiService.searchAccountByName(search)
    .subscribe((results:any) =>{
      this.accounts = results.accounts;
      this.hasSearched = true;
    })

  }



}
