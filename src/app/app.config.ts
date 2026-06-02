import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Preset } from './preset';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideHttpClient(withInterceptors())
    MessageService,
    ConfirmationService,
    DialogService,

    providePrimeNG({
      ripple: true,

      theme: {
        preset: Preset,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark-mode',
          ripple: true,
        },
      },
    }),
  ],
};
