export interface Categorie {
  id: number;
  nom: string;
  description?: string;
}

export interface Produit {
  id: number;
  nom: string;
  description?: string;
  prix: number;
  quantiteStock: number;
  disponible: boolean;
  imagePrincipale?: string;
  categorieId: number;
  Categorie?: Categorie;
}
