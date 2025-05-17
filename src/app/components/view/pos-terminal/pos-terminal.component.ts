import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../../services/categories/categorie.service';
import { ProduitService } from '../../../services/produits/produit.service';
import { CommandeService } from '../../../services/commandes/commande.service';
import { Categorie, Produit } from '../../../models/produit.model';
import { Commande, DetailCommande } from '../../../models/commande.model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importer FormsModule

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    FormsModule  // Ajouter FormsModule ici
  ],
  selector: 'app-pos-terminal',
  templateUrl: './pos-terminal.component.html',
  styleUrls: ['./pos-terminal.component.css','./pos-terminal.component2.css']
})
export class PosTerminalComponent implements OnInit {
  categories: Categorie[] = [];
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  selectedProducts: Produit[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private categorieService: CategorieService,
    private produitService: ProduitService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProduits();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.filteredProduits = data; // Initialize with all products
      },
      (error) => {
        console.error('Error fetching produits:', error);
      }
    );
  }selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    if (categoryId === null) {
      // Show all products if 'All' category is selected
      this.filteredProduits = this.produits;
    } else {
      // Filter products by selected category
      this.filteredProduits = this.produits.filter(p => p.categorieId === categoryId);
    }
  }

  addProductToSelection(produit: Produit): void {
    const existingProduct = this.selectedProducts.find(p => p.id === produit.id);
    if (existingProduct) {
      existingProduct.quantiteStock += 1;
    } else {
      this.selectedProducts.push({ ...produit, quantiteStock: 1 });
    }
  }

  removeProductFromSelection(produit: Produit): void {
    const index = this.selectedProducts.findIndex(p => p.id === produit.id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }


  checkout(): void {
    const details: DetailCommande[] = this.selectedProducts.map(p => ({
      proID: p.id,
      qty: p.quantiteStock,
      price: p.prix,
      amount: p.prix * p.quantiteStock
    }));

    const commande: Commande = {
      aDate: new Date().toISOString().split('T')[0],
      aTime: new Date().toLocaleTimeString(),
      TableName: 'Table 1',
      WaiterName: 'Server 1',
      status: 'Pending',
      orderType: 'Dine-in',
      total: this.getTotalAmount(),
      received: 0,
      change: 0,
      details
    };

    this.commandeService.createCommande(commande).subscribe({
      next: (data: Commande) => {
        console.log('Commande créée avec succès:', data);
        this.selectedProducts = [];
      },
      error: (error: any) => {
        console.error('Erreur lors de la création de la commande:', error);
      }
    });
  }
  selectProduct(produit: Produit): void {
    const existingProduct = this.selectedProducts.find(p => p.id === produit.id);
    if (existingProduct) {
      existingProduct.quantiteStock++;
    } else {
      this.selectedProducts.push({ ...produit, quantiteStock: 1 });
    }
  }

  getTotalAmount(): number {
    return this.selectedProducts.reduce((acc, p) => acc + (p.prix * p.quantiteStock), 0);
  }

  getImageUrl(imageName: string | undefined): string {
    return imageName ? `${imageName}` : 'default-image-path'; // Provide a default image path if needed
  }
}
