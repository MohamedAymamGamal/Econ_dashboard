import { Component } from '@angular/core';
import { HeroSection } from "../hero-section/hero-section";
import { FeaturedCollections } from "../featured-collections/featured-collections";
import { JoinCollective } from "../join-collective/join-collective";

@Component({
  selector: 'app-main-home',
  imports: [HeroSection, FeaturedCollections, JoinCollective],
  templateUrl: './main-home.html',
  styleUrl: './main-home.css',
})
export class MainHome {

}
