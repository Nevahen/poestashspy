import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { Boxi } from './components/boxi.component';
import { Navbar } from './components/navbar/navbar.component';
import { StashView } from './components/stashView/stashView.component';
import { StashItem } from './components/stashView/stashItem.component';
import { ApiService } from './api.service';
import { RouterModule, Routes} from '@angular/router';
import { SearchComponentComponent } from './search-component/search-component.component';

const routes: Routes = [
  {path: 'stashView', component: StashView},
  {path: 'search', component: SearchComponentComponent},
  {path: 'stashView/:account', component: StashView},
  {path: '', redirectTo: '/search', pathMatch:'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    Boxi,
    Navbar,
    StashView,
    StashItem,
    SearchComponentComponent,   
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
