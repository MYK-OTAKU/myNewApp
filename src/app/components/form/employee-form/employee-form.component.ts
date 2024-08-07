// src/app/components/form/employee-form/employee-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../../../models/utilisateur.model';
import { UtilisateurService } from '../../../services/utilisateurs/utilisateur.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageBoxService } from '../../../services/message-box.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() utilisateurId?: number;
  @Output() utilisateurUpdated = new EventEmitter<void>();
  showModal: boolean = false;
  isEditMode: boolean = false;
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
    recette: 0,
    twoFactorEnabled: false,
    twoFactorSecret: '',
    qrScanned: false
  };

  constructor(
    private utilisateurService: UtilisateurService,
    private messageBoxService: MessageBoxService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.utilisateurId) {
      this.isEditMode = true;
      this.loadUtilisateur(this.utilisateurId);
    }
  }

  openModal(utilisateur?: any): void {
    if (utilisateur) {
      this.isEditMode = true;
      this.utilisateur = { ...utilisateur };
      this.utilisateurId = utilisateur.id;
    } else {
      this.isEditMode = false;
      this.utilisateur = {
        nom: '',
        prenom: '',
        role: 'client',
        nomUtilisateur: '',
        motDePasse: '',
        email: '',
        numeroTel: '',
        adresse: '',
        recette: 0,
        twoFactorEnabled: false,
        twoFactorSecret: '',
        qrScanned: false
      };
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  loadUtilisateur(id: number): void {
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (data: any) => {
        this.utilisateur = data;
        this.utilisateurId = data.id;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        this.messageBoxService.showMessage('Erreur lors du chargement de l\'utilisateur', 'error');
      }
    });
  }

  saveUtilisateur(): void {
    if (this.isEditMode) {
      this.utilisateurService.mettreAJourUtilisateur(this.utilisateurId!, this.utilisateur).subscribe({
        next: (data: Utilisateur) => {
          console.log('Utilisateur mis à jour avec succès:', data);
          this.closeModal();
          this.utilisateurUpdated.emit();
          this.messageBoxService.showMessage('Utilisateur mis à jour avec succès', 'success');
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          this.messageBoxService.showMessage('Erreur lors de la mise à jour de l\'utilisateur', 'error');
        }
      });
    } else {
      console.log('Données envoyées pour la création:', this.utilisateur);
      this.utilisateurService.creerUtilisateur(this.utilisateur).subscribe({
        next: (data: Utilisateur) => {
          console.log('Utilisateur créé avec succès:', data);
          this.closeModal();
          this.utilisateurUpdated.emit();
          this.messageBoxService.showMessage('Utilisateur créé avec succès', 'success');
        },
        error: (error: any) => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
          this.messageBoxService.showMessage('Erreur lors de la création de l\'utilisateur', 'error');
        }
      });
    }
  }
}
