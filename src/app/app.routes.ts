import { Routes } from '@angular/router';
import { P1Component } from './p1/p1.component';
import { P2Component } from './p2/p2.component';
import { P3Component } from './p3/p3.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'p1', component: P1Component },
      { path: 'p2', component: P2Component },
      { path: 'p3', component: P3Component },
      { path: '', redirectTo: 'p1', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
