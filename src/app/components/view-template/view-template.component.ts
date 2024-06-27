// src/app/components/view-template/view-template.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {
  tables: any[] = [];
  showScrollTopButton = false;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getTables().subscribe({
      next: (data: any[]) => {
        this.tables = data;
      },
      error: (error) => {
        console.error('Error fetching tables:', error);
      }
    });
  }

  addTable(): void {
    // Implémente la logique pour ajouter une table
  }

  editTable(table: any): void {
    // Implémente la logique pour modifier une table
  }

  deleteTable(table: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette table?')) {
      this.tableService.deleteTable(table.id).subscribe(() => {
        this.tables = this.tables.filter(t => t.id !== table.id);
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
}
