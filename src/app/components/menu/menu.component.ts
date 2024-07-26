import { Component, ViewChild, ElementRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/authentifiaction/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  sidebarVisible: boolean = true;
  isMobile = false;
  dropdownVisible: boolean = false;

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;

  constructor(private sidebarService: SidebarService, private authService: AuthService) {
    this.sidebarService.sidebarVisible$.subscribe(
      (visible) => (this.sidebarVisible = visible)
    );
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    if (this.dropdownVisible) {
      this.dropdownMenu.nativeElement.classList.add('show');
    } else {
      this.dropdownMenu.nativeElement.classList.remove('show');
    }
  }
}
