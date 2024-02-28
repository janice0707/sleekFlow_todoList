import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { APIInterceptor } from './api-interceptor';
import { environment } from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient((withFetch(), withInterceptorsFromDi())),
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
    {provide: "BASE_API_URL", useValue: environment.apiUrl}
  ],

  
};
