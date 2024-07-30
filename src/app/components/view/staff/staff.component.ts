// src/app/components/view/staff/staff.component.ts
import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateurs/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur.model';
import { EmployeeFormComponent } from '../../form/employee-form/employee-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessageBoxService } from '../../../services/message-box.service';
import { MessageBoxModule } from '../../../module/message-box/message-box.module';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmployeeFormComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MessageBoxModule,
  ],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  @ViewChild('employeeForm') employeeFormComponent!: EmployeeFormComponent;
  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  searchTerm: string = '';
  showScrollTopButton = false;
  sortKey: keyof Utilisateur | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  hasServeurRole: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private messageBoxService: MessageBoxService
  ) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (response: any) => {
        console.log('Response from API:', response);
        if (Array.isArray(response.données)) {
          this.utilisateurs = response.données;
          this.filteredUtilisateurs = response.données;
        } else {
          console.error('Expected array but got:', response.données);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.messageBoxService.showMessage(
          'Erreur lors du chargement des utilisateurs',
          'error'
        );
      },
    });
  }

  addUtilisateur(): void {
    console.log('addUtilisateur called');
    if (this.employeeFormComponent) {
      console.log('employeeFormComponent exists');
      this.employeeFormComponent.openModal();
    } else {
      console.log('employeeFormComponent is undefined');
    }
  }

  editUtilisateur(utilisateur: Utilisateur): void {
    console.log('editUtilisateur called with', utilisateur);
    if (this.employeeFormComponent) {
      console.log('employeeFormComponent exists');
      this.employeeFormComponent.openModal(utilisateur);
    } else {
      console.log('employeeFormComponent is undefined'); // Debugging line
    }
  }

  confirmDeleteUtilisateur(id: number): void {
    this.messageBoxService.showConfirmation(
      'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      (result: boolean) => {
        if (result) {
          this.deleteUtilisateur(id);
        }
      }
    );
  }

  deleteUtilisateur(id: number): void {
    console.log('deleteUtilisateur called with id', id);
    this.utilisateurService.deleteUtilisateur(id).subscribe({
      next: () => {
        console.log('Utilisateur supprimé avec succès');
        this.messageBoxService.showMessage(
          'Utilisateur supprimé avec succès',
          'success'
        );
        this.loadUtilisateurs();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        this.messageBoxService.showMessage(
          'Erreur lors de la suppression de l\'utilisateur',
          'error'
        );
      },
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchUtilisateurs(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUtilisateurs = this.utilisateurs.filter((utilisateur) =>
      utilisateur.nom.toLowerCase().includes(term) ||
      utilisateur.prenom.toLowerCase().includes(term) ||
      utilisateur.nomUtilisateur.toLowerCase().includes(term) ||
      utilisateur.email.toLowerCase().includes(term) ||
      utilisateur.role.toLowerCase().includes(term)
    );
  }

  sortBy(key: keyof Utilisateur): void {
    if (this.sortKey === key) {
      this.sortDirection =
        this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.filteredUtilisateurs.sort((a, b) => {
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
