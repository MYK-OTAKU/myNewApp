import { Component } from '@angular/core';
import { SidebarService } from './../../services/sidebar.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private SidebarServicee: SidebarService) {}

  toggleSidebar() {
    this.SidebarServicee.toggleSidebar();
  }
}
