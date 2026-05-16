import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path : 'authentication',
    loadComponent : () =>
      import('./authentication/authentication').then((m) => m.Authentication),
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () => import('./authentication/login/login').then((m) => m.Login),
      },

      // {
      //   path: "forget-password",
      //   loadComponent: () => import('./authentication/forget-password/forget-password').then((m) => m.ForgetPassword),
      // },

      {
        path: 'register',
        loadComponent: () => import('./authentication/register/register').then((m) => m.Register),
      },

      {
        path: 'email-verification',
        loadComponent: () => import('./authentication/email-verification/email-verification').then((m) => m.EmailVerification),
      },
    ]
  },


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
