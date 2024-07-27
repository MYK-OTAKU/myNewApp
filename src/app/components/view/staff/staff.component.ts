import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateurs/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur.model';
import { EmployeeFormComponent } from '../../form/employee-form/employee-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessageBoxComponent } from '../../message-box/message-box.component';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeFormComponent, ReactiveFormsModule, MatIconModule, MatButtonModule, ],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
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

  messageBoxType: 'confirmation' | 'warning' | 'error' | 'question' = 'confirmation';
  messageBoxTitle: string = '';
  messageBoxMessage: string = '';
  isMessageBoxVisible: boolean = false;

  confirmAction?: () => void;

  constructor(private utilisateurService: UtilisateurService) {}

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
        console.error('Error fetching utilisateurs:', error);
      }
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
      console.log('employeeFormComponent is undefined');
    }
  }

  confirmDeleteUtilisateur(id: number): void {
    console.log('confirmDeleteUtilisateur called with id', id); // Debugging line
    this.messageBoxType = 'confirmation';
    this.messageBoxTitle = 'Confirmer la suppression';
    this.messageBoxMessage = 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?';
    this.isMessageBoxVisible = true;
    console.log('Message box should be visible now'); // Debugging line
    this.confirmAction = () => this.deleteUtilisateur(id);
  }

  deleteUtilisateur(id: number): void {
    console.log('deleteUtilisateur called with id', id);
    this.utilisateurService.deleteUtilisateur(id).subscribe({
      next: () => {
        console.log('Utilisateur deleted successfully');
        this.loadUtilisateurs();
      },
      error: (error) => {
        console.error('Error deleting utilisateur:', error);
      }
    });
  }

  handleConfirm(): void {
    if (this.confirmAction) {
      this.confirmAction();
      this.confirmAction = undefined;
    }
    this.isMessageBoxVisible = false;
  }

  handleCancel(): void {
    this.isMessageBoxVisible = false;
    console.log('Delete cancelled');
  }

  handleClose(): void {
    this.isMessageBoxVisible = false;
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
    this.filteredUtilisateurs = this.utilisateurs.filter(utilisateur =>
      utilisateur.nom.toLowerCase().includes(term) ||
      utilisateur.prenom.toLowerCase().includes(term) ||
      utilisateur.nomUtilisateur.toLowerCase().includes(term) ||
      utilisateur.email.toLowerCase().includes(term) ||
      utilisateur.role.toLowerCase().includes(term)
    );
  }

  sortBy(key: keyof Utilisateur): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
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
