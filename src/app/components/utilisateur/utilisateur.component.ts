// src/app/components/utilisateurs/utilisateurs.component.ts

import { Component, HostListener, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeFormComponent],
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  searchTerm: string = '';
  showScrollTopButton = false;
  sortKey: keyof Utilisateur | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data: Utilisateur[]) => {
        this.utilisateurs = data;
        this.filteredUtilisateurs = data;
      },
      error: (error) => {
        console.error('Error fetching utilisateurs:', error);
      }
    });
  }

  addUtilisateur(): void {
    // Implémentez la logique pour ajouter un utilisateur
  }

  editUtilisateur(utilisateur: Utilisateur): void {
    // Implémentez la logique pour modifier un utilisateur
  }

  deleteUtilisateur(utilisateur: Utilisateur): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      this.utilisateurService.deleteUtilisateur(utilisateur.id!).subscribe(() => {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== utilisateur.id);
        this.searchUtilisateurs();
      });
    }
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
