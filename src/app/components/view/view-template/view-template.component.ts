// src/app/components/view/view-template/view-template.component.ts
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableService } from '../../../services/table.service';
import { TableFormComponent } from '../../form/table-form/table-form.component';
import { MessageBoxService } from '../../../services/message-box.service';
import { MessageBoxModule } from '../../../module/message-box/message-box.module';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CommonModule, FormsModule, TableFormComponent, MessageBoxModule],
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {
  @ViewChild('tableForm') tableFormComponent!: TableFormComponent;
  tables: any[] = [];
  filteredTables: any[] = [];
  searchTerm: string = '';
  showScrollTopButton = false;

  constructor(private tableService: TableService, private messageBoxService: MessageBoxService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getTables().subscribe({
      next: (data: any[]) => {
        this.tables = data;
        this.filteredTables = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tables:', error);
        this.messageBoxService.showMessage('Erreur lors du chargement des tables', 'error');
      }
    });
  }

  addTable(): void {
    this.tableFormComponent.openModal();
  }

  editTable(table: any): void {
    this.tableFormComponent.openModal(table);
  }

  deleteTable(table: any): void {
    this.messageBoxService.showConfirmation('Êtes-vous sûr de vouloir supprimer cette table ?', (result: boolean) => {
      if (result) {
        this.tableService.deleteTable(table.id).subscribe({
          next: () => {
            this.messageBoxService.showMessage('Table supprimée avec succès', 'success');
            this.loadTables(); // Recharger les données après la suppression
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la table', error);
            this.messageBoxService.showMessage('Erreur lors de la suppression de la table', 'error');
          }
        });
      }
    });
  }

  onTableUpdated(): void {
    this.loadTables();
    this.messageBoxService.showMessage('Table mise à jour avec succès', 'success');
  }

  searchTables(): void {
    this.filteredTables = this.tables.filter(table =>
      table.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      table.capacite.toString().includes(this.searchTerm.toLowerCase()) ||
      (table.disponibilite ? 'oui' : 'non').includes(this.searchTerm.toLowerCase())
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
