import { Routes } from '@angular/router';

export const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home').then((m) => m.Home),
       children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./home/products/products').then((m) => m.Products),
      },
         {
           path: 'cart',
           loadComponent: () =>
             import('./home/cart-page/cart-page').then((m) => m.CartPage),
         }
    ]
  }






];
