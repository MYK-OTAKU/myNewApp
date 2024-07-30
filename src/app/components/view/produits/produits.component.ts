// src/app/components/view/produits/produits.component.ts
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../../services/produits/produit.service';
import { Produit } from '../../../models/produit.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../../form/product-form/product-form.component';
import { MessageBoxService } from '../../../services/message-box.service';
import { MessageBoxModule } from '../../../module/message-box/message-box.module';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent, MessageBoxModule],
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

  constructor(private produitService: ProduitService, private messageBoxService: MessageBoxService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.filteredProduits = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
        this.messageBoxService.showMessage('Erreur lors du chargement des produits', 'error');
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
    this.messageBoxService.showConfirmation('Êtes-vous sûr de vouloir supprimer ce produit ?', (result: boolean) => {
      if (result) {
        this.produitService.deleteProduit(produit.id).subscribe({
          next: () => {
            this.messageBoxService.showMessage('Produit supprimé avec succès', 'success');
            this.loadProduits(); // Recharger les données après la suppression
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du produit', error);
            this.messageBoxService.showMessage('Erreur lors de la suppression du produit', 'error');
          }
        });
      }
    });
  }

  onProductUpdated(): void {
    this.loadProduits();
    this.messageBoxService.showMessage('Produit mis à jour avec succès', 'success');
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
