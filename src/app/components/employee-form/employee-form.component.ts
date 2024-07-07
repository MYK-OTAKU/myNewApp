// src/app/components/employee-form/employee-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur.model';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() utilisateurId?: number; // ID de l'utilisateur à modifier, si applicable
  showModal: boolean = false;
  isEditMode: boolean = false; // Mode édition ou création
  roles: string[] = ['admin', 'serveur', 'cuisinier', 'client', 'superadmin'];
  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    role: 'client',
    nomUtilisateur: '',
    motDePasse: '',
    email: '',
    numeroTel: '',
    adresse: '',
    recette: 0
  };

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {
    if (this.utilisateurId) {
      this.isEditMode = true;
      this.loadUtilisateur(this.utilisateurId);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loadUtilisateur(id: number) {
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (data: Utilisateur) => {
        this.utilisateur = data;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    });
  }

  saveUtilisateur() {
    if (this.isEditMode) {
      this.utilisateurService.mettreAJourUtilisateur(this.utilisateurId!, this.utilisateur).subscribe({
        next: (data: Utilisateur) => {
          console.log('Utilisateur mis à jour avec succès:', data);
          this.closeModal();
          this.router.navigate(['/dashboard/staff']); // Redirection après la mise à jour
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      });
    } else {
      this.utilisateurService.creerUtilisateur(this.utilisateur).subscribe({
        next: (data: Utilisateur) => {
          console.log('Utilisateur créé avec succès:', data);
          this.closeModal();
          this.router.navigate(['/dashboard/staff']); // Redirection après la création
        },
        error: (error: any) => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
      });
    }
  }
}
