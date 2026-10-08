import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/AAMain/app.config';
import { AppComponent } from './app/AAMain/app.component';
import { LANGUAGE } from './app/i18n/language';

// Changed attribute of html element lang in <html> to match the selected language (index.html has default "pl" as i am Polish ;) )
document.documentElement.lang = LANGUAGE;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
