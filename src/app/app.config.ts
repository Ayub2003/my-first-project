import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { usersFeature} from "./user/state/users.reducer";
import * as UsersEffects from './user/state/users.effects';
import { USERS_FEATURE_KEY, usersReducer } from './user/state/users.reducer';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    { provide: API_URL, useValue: 'https://jsonplaceholder.typicode.com' },
    provideAnimations(),
    provideHttpClient(),
    provideEffects(UsersEffects),
    provideStore({
      [USERS_FEATURE_KEY]: usersReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
