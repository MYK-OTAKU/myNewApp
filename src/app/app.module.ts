// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TableService } from './services/table.service';
import { routes } from './app.routes';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTemplateComponent } from './components/view-template/view-template.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { PosTerminalComponent } from './pos-terminal/pos-terminal.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { UtilisateurService } from './services/utilisateur.service';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProduitService } from './services/produit.service';
import { CategorieService } from './services/categorie.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TableFormComponent } from './components/table-form/table-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    CategoryFormComponent,
    TableFormComponent,
    ProductFormComponent,
    // MessageBoxComponent,
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
    RouterModule.forRoot(routes)
  ],
  providers: [TableService, UtilisateurService,ProduitService,CategorieService,AuthService,UserService],
  bootstrap: []
})
export class AppModule { }
