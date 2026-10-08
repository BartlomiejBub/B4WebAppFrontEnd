import { ApplicationConfig, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../AAMain/app.routes';
import { UserService } from '../usersManagement/services/userService';
import { HttpBackend, HttpClient, provideHttpClient } from '@angular/common/http';

/* providers used in project */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
  ]

};

