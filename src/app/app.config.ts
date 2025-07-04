import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(
    routes,
    withViewTransitions({
      skipInitialTransition: true,
      onViewTransitionCreated: (transition) => { },
    }),
  ),
  // Hash Strategy for routing
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  // Importing HttpClientModule and ReactiveFormsModule for HTTP requests and reactive forms
  importProvidersFrom(HttpClientModule, ReactiveFormsModule),
  ]
};
