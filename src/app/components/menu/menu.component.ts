import { Component } from '@angular/core';
import { SidebarService } from './../../services/sidebar.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private SidebarServicee: SidebarService,private authService: AuthService,) {}

  
  
  logout() {
    this.authService.logout();
  }
  toggleSidebar() {
    this.SidebarServicee.toggleSidebar();
  }
}
