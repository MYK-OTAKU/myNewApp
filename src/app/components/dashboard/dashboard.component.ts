import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuComponent } from '../menu/menu.component';
import { MaincontentComponent } from '../maincontent/maincontent.component';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    MenuComponent,
    MaincontentComponent,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarVisible: boolean = true;
  isMobile = false;

  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService,
    @Inject(Router) private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 650;
    if (this.isMobile) {
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
    }
  }

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });

    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target && this.isMobile && this.sidebarVisible && !target.closest('.sidebar') && !target.closest('button')) {
      this.sidebarService.toggleSidebar();
    }
  }
}
