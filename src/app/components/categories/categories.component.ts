import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFormComponent],
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
    this.categoryForm.openModal();
  }

  editCategory(category: any): void {
    this.categoryForm.openModal(category);
  }

  deleteCategory(category: any): void {
    this.categorieService.deleteCategory(category.id).subscribe({
      next: () => {
        console.log('Category deleted successfully');
        this.filteredCategories = this.filteredCategories.filter(c => c.id !== category.id);
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      }
    });
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
