// src/app/components/categories/categories.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  addCategory(): void {
    // Implémentez la logique pour ajouter une catégorie
  }

  editCategory(category: any): void {
    // Implémentez la logique pour modifier une catégorie
  }

  deleteCategory(category: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie?')) {
      this.categorieService.deleteCategory(category.id).subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== category.id);
        this.searchCategories();
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchCategories(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.nom.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );
  }

  sortBy(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.filteredCategories.sort((a, b) => {
      let comparison = 0;
      if (a[key] > b[key]) {
        comparison = 1;
      } else if (a[key] < b[key]) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}
