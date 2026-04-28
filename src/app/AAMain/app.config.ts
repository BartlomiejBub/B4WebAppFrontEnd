import { ApplicationConfig, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../AAMain/app.routes';
import { UserService } from '../usersManagment/user-service/user-service';
import { HttpBackend, HttpClient, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
  ]

};

