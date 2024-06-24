import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Importation de Router
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuComponent } from '../menu/menu.component';
import { MaincontentComponent } from '../maincontent/maincontent.component';
import { P1Component } from '../p1/p1.component';
import { P2Component } from '../p2/p2.component';
import { P3Component } from '../p3/p3.component';
import { SidebarService } from '../sidebar.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    MenuComponent,
    MaincontentComponent,
    P1Component,
    P2Component,
    P3Component
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarVisible: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService,
    @Inject(Router) private router: Router // Injection de Router
  ) {
    this.sidebarService.sidebarVisible$.subscribe(
      (visible) => (this.sidebarVisible = visible)
    );

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
