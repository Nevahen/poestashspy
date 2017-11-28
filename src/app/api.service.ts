import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stash } from './models/stash.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private stashUrl = '/api/stashes/';

  getStashByID(stashid: number): Observable<Stash[]>{

    var sUrl = this.stashUrl + stashid;
    console.log(sUrl);
      
    return this.http.get<Stash[]>(sUrl);
    }

  // Rename / Make new function because it doesn't get only latest stashes anymore
  getLatestStashes(account?:string): Observable<Stash[]>{

    if(account){
      return this.http.get<Stash[]>('/api/accounts/'+account+'/stashes');
    }
    return this.http.get<Stash[]>('/api/stashes/');
  }

  searchAccountByName(account: string): Observable<string>{
    return this.http.get<string>('/api/accounts?search='+account)
  }

  recentAccounts(): Observable<string>{    
        return this.http.get<string>('/api/accounts')    
      }


}
