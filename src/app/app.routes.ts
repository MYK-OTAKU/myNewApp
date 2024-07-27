import { Routes } from '@angular/router';
import { LoginComponent } from './components/form/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/authentifiaction/auth.guard';
import { HomeComponent } from './components/view/home/home.component';
import { CategoriesComponent } from './components/view/categories/categories.component';
import { TablesComponent } from './components/view/tables/tables.component';
import { StaffComponent } from './components/view/staff/staff.component';
import { KitchenComponent } from './components/view/kitchen/kitchen.component';
import { StatisticsComponent } from './components/view/statistics/statistics.component';
import { ViewTemplateComponent } from './components/view/view-template/view-template.component';
import { ProduitsComponent } from './components/view/produits/produits.component';
import { PosTerminalComponent } from './components/view/pos-terminal/pos-terminal.component';
import { ResetPasswordComponent } from './components/form/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/form/change-password/change-password.component';
import { UnauthorizedComponent } from './components/layouts/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/layouts/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, data: { roles: ['admin', 'superadmin', 'serveur'] } },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin'] } },
      { path: 'produits', component: ProduitsComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin'] } },
      { path: 'staff', component: StaffComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin'] } },
      { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin', 'cuisinier'] } },
      { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin'] } },
      { path: 'tables', component: ViewTemplateComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin'] } },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }

    ]
  },
  { path: 'POS', component: PosTerminalComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin', 'serveur'] } },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password/:token', component: ChangePasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

   { path: '**', component: NotFoundComponent }
];
