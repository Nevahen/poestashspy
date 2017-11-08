import {Component} from '@angular/core';

@Component({
selector: 'navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css']
})

export class Navbar{
    links = ["Home", "About", "Statistics", "Testi"];
    selected = this.links[0];
}