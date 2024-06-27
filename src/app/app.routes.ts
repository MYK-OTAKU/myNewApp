import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { P1Component } from './components/p1/p1.component';
import { P2Component } from './components/p2/p2.component';
import { P3Component } from './components/p3/p3.component';
import { AuthGuard } from './services/auth.guard';
import { ViewTemplateComponent } from './components/view-template/view-template.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'tables', component: ViewTemplateComponent },
      { path: 'p1', component: P1Component },
      { path: 'p2', component: P2Component },
      { path: 'p3', component: P3Component },
      { path: '', redirectTo: 'tables', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
