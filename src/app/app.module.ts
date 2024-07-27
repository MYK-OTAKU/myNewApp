// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TableService } from './services/table.service';
import { routes } from './app.routes';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTemplateComponent } from './components/view/view-template/view-template.component';
import { CategoriesComponent } from './components/view/categories/categories.component';
import { KitchenComponent } from './components/view/kitchen/kitchen.component';
import { ProduitsComponent } from './components/view/produits/produits.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './module/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeFormComponent } from './components/form/employee-form/employee-form.component';
import { PosTerminalComponent } from './components/view/pos-terminal/pos-terminal.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { UtilisateurService } from './services/utilisateurs/utilisateur.service';
import { CategoryFormComponent } from './components/form/category-form/category-form.component';
import { ProduitService } from './services/produits/produit.service';
import { CategorieService } from './services/categories/categorie.service';
import { AuthService } from './services/authentifiaction/auth.service';
import { UserSercice } from './services/utilisateurs/user.service';
import { TableFormComponent } from './components/form/table-form/table-form.component';
import { ProductFormComponent } from './components/form/product-form/product-form.component';
import { LoadingComponent } from './components/layouts/loading/loading.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { Routes } from '@angular/router';
import { LoginComponent } from './components/form/login/login.component';
import { ResetPasswordComponent } from './components/form/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/form/change-password/change-password.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/authentifiaction/auth.guard';

import { StaffComponent } from './components/view/staff/staff.component';
import { UnauthorizedComponent } from './components/layouts/unauthorized/unauthorized.component';
import { MessageBoxModule } from './module/message-box/message-box.module';

@NgModule({
  declarations: [
    UnauthorizedComponent,

  ],
  imports: [
    ResetPasswordComponent,
    AppComponent,
    CategoryFormComponent,
    TableFormComponent,
    ProductFormComponent,
    SidebarComponent,
    DashboardComponent,
    ViewTemplateComponent,
    CategoriesComponent,
    KitchenComponent,
    ProduitsComponent,
    EmployeeFormComponent,
    PosTerminalComponent,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoadingComponent,LoginComponent,
    ChangePasswordComponent,
    StaffComponent,
    MessageBoxModule,

    RouterModule.forRoot(routes)
  ],
  providers: [TableService, UtilisateurService,ProduitService,CategorieService,AuthService,UserSercice],
  bootstrap: []
})
export class AppModule { }
