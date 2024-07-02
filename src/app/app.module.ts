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
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Ajoutez ici les autres composants si nécessaire
  ],
  imports: [
    MatButtonModule, MatMenuModule,
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ViewTemplateComponent,
    CategoriesComponent,
    KitchenComponent,
    BrowserModule,
    HttpClientModule,
    ProduitsComponent , ReactiveFormsModule, BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TableService],
  bootstrap: []
})
export class AppModule { }
