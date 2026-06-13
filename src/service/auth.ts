import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { API } from './api';

@Injectable({ providedIn: 'root' })
export class Auth {
  private router = inject(Router);
  private api = inject(API);

  private currentUserSignal = signal<any | null>(undefined as any); // undefined = loading

  currentUser = this.currentUserSignal.asReadonly();
  isLoggedIn = computed(() => !!this.currentUserSignal());
  isLoading = computed(() => this.currentUserSignal() === undefined);

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    this.api.index<any>('account/me').subscribe({
      next: (user) => this.currentUserSignal.set(user),
      error: () => this.currentUserSignal.set(null)
    });
  }



  logout() {
    this.api.store('account/logout', {}).subscribe({
      next: () => {
        this.currentUserSignal.set(null);
        this.router.navigate(['/home']);
      }
    });
  }
}
