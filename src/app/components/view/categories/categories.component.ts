// src/app/components/view/categories/categories.component.ts
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from '../../../services/categories/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryFormComponent } from '../../form/category-form/category-form.component';
import { MessageBoxService } from '../../../services/message-box.service';
import { MessageBoxModule } from '../../../module/message-box/message-box.module';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFormComponent, MessageBoxModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  showScrollTopButton = false;
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChild('categoryForm') categoryForm!: CategoryFormComponent;

  constructor(private categorieService: CategorieService, private messageBoxService: MessageBoxService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories', error);
        this.messageBoxService.showMessage('Erreur lors du chargement des catégories', 'error');
      }
    });
  }

  addCategory(): void {
    this.categoryForm.openModal();
  }

  editCategory(category: any): void {
    this.categoryForm.openModal(category);
  }

  deleteCategory(category: any): void {
    this.messageBoxService.showConfirmation('Êtes-vous sûr de vouloir supprimer cette catégorie ?', (result: boolean) => {
      if (result) {
        this.categorieService.deleteCategory(category.id).subscribe({
          next: () => {
            this.messageBoxService.showMessage('Catégorie supprimée avec succès', 'success');
            this.loadCategories(); // Recharger les données après la suppression
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la catégorie', error);
            this.messageBoxService.showMessage('Erreur lors de la suppression de la catégorie', 'error');
          }
        });
      }
    });
  }

  onCategoryUpdated(): void {
    this.loadCategories();
    this.messageBoxService.showMessage('Catégorie mise à jour avec succès', 'success');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchCategories() {
    this.filteredCategories = this.categories.filter(category =>
      category.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortBy(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.filteredCategories.sort((a, b) => {
      const comparison = a[key].localeCompare(b[key]);
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}
