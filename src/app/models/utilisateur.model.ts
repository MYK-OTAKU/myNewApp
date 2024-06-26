// src/app/models/utilisateur.model.ts

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  role: 'admin' | 'serveur' | 'cuisinier' | 'client' | 'superadmin';
  nomUtilisateur: string;
  email: string;
  numeroTel?: string;
  adresse?: string;
  recette?: number; // Seulement pour les serveurs
}
