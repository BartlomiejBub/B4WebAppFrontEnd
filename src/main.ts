import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/AAMain/app.config';
import { AppComponent } from './app/AAMain/app.component';
import { UserComponent } from './app/usersManagment/user.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
