import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableService } from '../../services/table.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {
  @Input() tableId?: number;
  showModal: boolean = false;
  isEditMode: boolean = false;
  table: any = {
    nom: '',
    capacite: 0,
    disponibilite: true
  };

  constructor(
    private tableService: TableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tableId) {
      this.isEditMode = true;
      this.loadTable(this.tableId);
    }
  }

  openModal(table?: any) {
    if (table) {
      this.isEditMode = true;
      this.table = { ...table };
    } else {
      this.isEditMode = false;
      this.table = {
        nom: '',
        capacite: 0,
        disponibilite: true
      };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loadTable(id: number) {
    this.tableService.getTable(id).subscribe({
      next: (data: any) => {
        this.table = data;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de la table:', error);
      }
    });
  }

  saveTable() {
    if (this.isEditMode) {
      this.tableService.editTable(this.table.id, this.table).subscribe({
        next: (data: any) => {
          console.log('Table mise à jour avec succès:', data);
          this.closeModal();
          this.router.navigate(['/dashboard/tables']); // Redirection après la mise à jour
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de la table:', error);
        }
      });
    } else {
      this.tableService.addTable(this.table).subscribe({
        next: (data: any) => {
          console.log('Table créée avec succès:', data);
          this.closeModal();
          this.router.navigate(['/dashboard/tables']); // Redirection après la création
        },
        error: (error: any) => {
          console.error('Erreur lors de la création de la table:', error);
        }
      });
    }
  }
}
