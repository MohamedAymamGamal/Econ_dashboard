import { Component } from '@angular/core';
import { HeroSection } from "../hero-section/hero-section";
import { FeaturedCollections } from "../featured-collections/featured-collections";
import { JoinCollective } from "../join-collective/join-collective";
import { NewArrivals } from '../new-arrivals/new-arrivals';

@Component({
  selector: 'app-main-home',
  imports: [HeroSection, FeaturedCollections, JoinCollective, NewArrivals],
  templateUrl: './main-home.html',
  styleUrl: './main-home.css',
})
export class MainHome {

}
