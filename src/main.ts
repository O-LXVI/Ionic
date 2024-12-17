import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';
import {environment} from "./environments/environment"; // Importa Firebase App

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

initializeApp(environment.firebaseConfig);
