export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  role: 'admin' | 'serveur' | 'cuisinier' | 'client' | 'superadmin';
  nomUtilisateur: string;
  motDePasse: string;
  email: string;
  numeroTel?: string;
  adresse?: string;
  recette?: number;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  qrScanned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
