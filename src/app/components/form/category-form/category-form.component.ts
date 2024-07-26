import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../../../models/produit.model';
import { CategorieService } from '../../../services/categories/categorie.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() categoryId?: number; // ID de la catégorie à modifier, si applicable
  @Output() categoryUpdated = new EventEmitter<void>(); // Émettre un événement après une mise à jour ou une création
  showModal: boolean = false;
  isEditMode: boolean = false; // Mode édition ou création
  category: Categorie = {
    id: 0,
    nom: '',
    description: ''
  };

  constructor(private categoryService: CategorieService, private router: Router) {}

  ngOnInit(): void {
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  openModal(category?: Categorie) {
    if (category) {
      this.isEditMode = true;
      this.category = { ...category };
    } else {
      this.isEditMode = false;
      this.category = {
        id: 0,
        nom: '',
        description: ''
      };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loadCategory(id: number) {
    this.categoryService.getCategory(id).subscribe({
      next: (data: Categorie) => {
        this.category = data;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de la catégorie:', error);
      }
    });
  }

  saveCategory() {
    if (this.isEditMode) {
      this.categoryService.editCategory(this.category.id, this.category).subscribe({
        next: (data: Categorie) => {
          console.log('Catégorie mise à jour avec succès:', data);
          this.closeModal();
          this.categoryUpdated.emit(); // Émettre l'événement
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de la catégorie:', error);
        }
      });
    } else {
      this.categoryService.addCategory(this.category).subscribe({
        next: (data: Categorie) => {
          console.log('Catégorie créée avec succès:', data);
          this.closeModal();
          this.categoryUpdated.emit(); // Émettre l'événement
        },
        error: (error: any) => {
          console.error('Erreur lors de la création de la catégorie:', error);
        }
      });
    }
  }
}
