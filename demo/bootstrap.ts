import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// stops if uncommented
 //document.addEventListener('DOMContentLoaded', () => {
   platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
 //});
