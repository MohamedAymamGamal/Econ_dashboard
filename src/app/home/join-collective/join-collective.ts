import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from "primeng/button";



interface Collection {
  label: string;
  description: string;
  image: string;
  alt: string;
}
@Component({
  selector: 'app-join-collective',
  imports: [NgOptimizedImage, Button],
  templateUrl: './join-collective.html',
  styleUrl: './join-collective.css',
})
export class JoinCollective {


 collections: Collection[] = [
    {
      label: 'The Lumina Collective',
      description: 'Join our community and get 15% off your first order plus early access to limited edition drops.',
      alt: 'Apparel',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe1ofTi1IpsPq0cRrWGVBqlSSwUT4OSX7b0glsGyd2Zf1aU0rWNJlfqchZ0-P_xXTXlsBGJEZS0sRvK2tZSPDAf_brDw_Haz8OruoCbqxrsAlnHKBtSVckjwknu50LmejZhha6vF-OGEYPEGQF--Ke_BBZG07XgSaFl6eBYEkxMqoOkexwyRoncWZdsbd7luXEprImCUaYcKuADunzYp5WEq6NgaPvK4sbsMUBLZxdkSvDRDgQ0tUhakL1BYmZyCfw0hVx-X0TxmQ',
    },


  ];

}
