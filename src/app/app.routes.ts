  // src/app/app.routes.ts
  import { Routes } from '@angular/router';
  import { LoginComponent } from './components/login/login.component';
  import { DashboardComponent } from './components/dashboard/dashboard.component';
  import { AuthGuard } from './services/auth.guard';
  import { PosTerminalComponent } from './pos-terminal/pos-terminal.component';

  import { HomeComponent } from './components/home/home.component';
  import { CategoriesComponent } from './components/categories/categories.component';
  import { TablesComponent } from './components/tables/tables.component';
  import { StaffComponent } from './components/staff/staff.component';
  import { KitchenComponent } from './components/kitchen/kitchen.component';
  import { StatisticsComponent } from './components/statistics/statistics.component';
  import { ViewTemplateComponent } from './components/view-template/view-template.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { UtilisateursComponent } from './components/utilisateur/utilisateur.component';

  export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'categories', component: CategoriesComponent },
        { path: 'produits', component: ProduitsComponent },
        // { path: 'tables', component: TablesComponent },
        { path: 'staff', component: UtilisateursComponent },
        // { path: 'staff', component: StaffComponent },

        { path: 'kitchen', component: KitchenComponent },
        { path: 'POS', component: PosTerminalComponent },
        { path: 'statistics', component: StatisticsComponent },
        { path: 'tables', component: ViewTemplateComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: '**', redirectTo: 'home' }
      ]
    },
    { path: '',  redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  ];
