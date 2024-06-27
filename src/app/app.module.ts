// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TableService } from './services/table.service';
import { ViewTemplateComponent } from './components/view-template/view-template.component'; // Ajoute ton composant ici

@NgModule({
  declarations: [

    // Autres composants...
  ],
  imports: [
    ViewTemplateComponent,  // Ajoute le composant view-template ici
    BrowserModule,
    HttpClientModule,
    AppComponent
    // Autres modules...
  ],
  providers: [TableService],
  bootstrap: []
})
export class AppModule { }
