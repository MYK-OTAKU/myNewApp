import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ajout de FormsModule
import { TableService } from '../../services/table.service';
import { TableFormComponent } from '../table-form/table-form.component';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CommonModule, FormsModule, TableFormComponent], // Ajout de FormsModule aux imports
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {
  @ViewChild('tableForm') tableFormComponent!: TableFormComponent;
  tables: any[] = [];
  filteredTables: any[] = [];
  searchTerm: string = '';
  showScrollTopButton = false;

  constructor(private tableService: TableService) {}

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
        console.error('Error fetching tables:', error);
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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette table?')) {
      this.tableService.deleteTable(table.id).subscribe(() => {
        this.tables = this.tables.filter(t => t.id !== table.id);
        this.searchTables();
      });
    }
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
