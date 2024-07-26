import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { CategoryFormComponent } from ./category-form.component'; // Assurez-vous que le chemin est correct
import { CategoryFormComponent } from '../components/form/category-form/category-form.component';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    CategoryFormComponent // Importez le composant autonome
  ]
})
export class CategoryFormModule {}
