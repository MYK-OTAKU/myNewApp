import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produit, Categorie } from '../../../models/produit.model';
import { ProduitService } from '../../../services/produits/produit.service';
import { CategorieService } from '../../../services/categories/categorie.service';
import { environment } from '../../../../environments/environment';
import { MessageBoxService } from '../../../services/message-box.service'; // Importer le service ici
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() productId?: number;
  @Output() productUpdated = new EventEmitter<void>(); // Émettre un événement après une mise à jour ou une création
  showModal: boolean = false;
  isEditMode: boolean = false;
  categories: Categorie[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  defaultImage: string = '../../../assets/images/carts.png';
  product: Produit = {
    id: 0,
    nom: '',
    description: '',
    prix: 0,
    quantiteStock: 0,
    disponible: true,
    categorieId: 0
  };

  constructor(
    private productService: ProduitService,
    private categoryService: CategorieService,
    private router: Router,
    private messageBoxService: MessageBoxService // Injecter le service ici
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  openModal(product?: Produit) {
    if (product) {
      this.isEditMode = true;
      this.product = { ...product };
      this.selectedImage = product.imagePrincipale ? `${environment.apiUrl}/${product.imagePrincipale}` : this.defaultImage;
    } else {
      this.isEditMode = false;
      this.product = {
        id: 0,
        nom: '',
        description: '',
        prix: 0,
        quantiteStock: 0,
        disponible: true,
        categorieId: 0
      };
      this.selectedImage = this.defaultImage;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null; // Reset the image preview on modal close
  }

  loadProduct(id: number) {
    this.productService.getProduit(id).subscribe({
      next: (data: Produit) => {
        this.product = data;
        this.selectedImage = data.imagePrincipale ? `${environment.apiUrl}/${data.imagePrincipale}` : this.defaultImage;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement du produit:', error);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }

  // Modifier la méthode saveProduct pour gérer l'erreur de fichier

  saveProduct() {
    // Vérifiez si nous sommes en mode édition et si une nouvelle image a été sélectionnée
   
    const formData = new FormData();
    formData.append('nom', this.product.nom);
    formData.append('description', this.product.description || '');
    formData.append('prix', this.product.prix.toString());
    formData.append('quantiteStock', this.product.quantiteStock.toString());
    formData.append('disponible', this.product.disponible.toString());
    formData.append('categorieId', this.product.categorieId.toString());
    if (this.imageFile) {
      formData.append('imagePrincipale', this.imageFile);
    }

    if (this.isEditMode) {
      this.productService.editProduit(this.product.id, formData).subscribe({
        next: (data: Produit) => {
          console.log('Produit mis à jour avec succès:', data);
          this.closeModal();
          this.productUpdated.emit(); // Émettre l'événement
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour du produit:', error);
          this.messageBoxService.showMessage('Erreur lors de la mise à jour du produit: ' + error.message, 'error');
        }
      });
    } else {
      this.productService.addProduit(formData).subscribe({
        next: (data: Produit) => {
          console.log('Produit créé avec succès:', data);
          this.closeModal();
          this.productUpdated.emit(); // Émettre l'événement
        },
        error: (error: any) => {
          console.error('Erreur lors de la création du produit:', error);
          this.messageBoxService.showMessage('Erreur lors de la création du produit: ' + error.message, 'error');
        }
      });
    }
  }

  onChooseFile() {
    document.getElementById('imagePrincipale')?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
        } else {
          this.selectedImage = this.defaultImage;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
