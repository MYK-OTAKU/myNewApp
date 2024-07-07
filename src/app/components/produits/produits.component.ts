import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  searchTerm: string = '';
  showScrollTopButton = false;
  sortKey: keyof Produit | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChild('productForm') productForm!: ProductFormComponent;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.filteredProduits = data;
      },
      error: (error) => {
        console.error('Error fetching produits:', error);
      }
    });
  }

  addProduit(): void {
    this.productForm.openModal();
  }

  editProduit(produit: Produit): void {
    this.productForm.openModal(produit);
  }

  deleteProduit(produit: Produit): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      this.produitService.deleteProduit(produit.id).subscribe(() => {
        this.produits = this.produits.filter(p => p.id !== produit.id);
        this.searchProduits();
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

  searchProduits(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProduits = this.produits.filter(produit =>
      produit.nom.toLowerCase().includes(term) ||
      produit.description?.toLowerCase().includes(term) ||
      produit.Categorie?.nom.toLowerCase().includes(term)
    );
  }

  sortBy(key: keyof Produit): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.filteredProduits.sort((a, b) => {
      let comparison = 0;
      if (a[key]! > b[key]!) {
        comparison = 1;
      } else if (a[key]! < b[key]!) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}
