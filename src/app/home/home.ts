import { Component } from '@angular/core';
import {Navbar} from './_componenst_home/navbar/navbar';
import {RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [Navbar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
