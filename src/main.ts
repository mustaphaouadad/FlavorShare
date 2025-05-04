import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom as angularImportProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

function importProvidersFrom(module: typeof HttpClientModule): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  return angularImportProvidersFrom(module);
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule),provideRouter(routes)]
});
    throw new Error('Function not implemented.');
  

