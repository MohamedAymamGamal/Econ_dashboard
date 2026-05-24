import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Preset } from './preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideHttpClient(withInterceptors())
    MessageService,
    ConfirmationService,
    providePrimeNG({
      ripple: true,

      theme: {
        preset: Preset,
        options: {
          prefix: 'p',
          darkModeSelector: 'disabled',
          ripple: true,

        }
      }
    })
  ]
};
