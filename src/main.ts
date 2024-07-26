// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { routes } from './app/app.routes';
import { AuthService } from './app/services/authentifiaction/auth.service';
import { AuthGuard } from './app/services/authentifiaction/auth.guard';
import { AuthInterceptor } from './app/services/authentifiaction/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, CommonModule),
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
