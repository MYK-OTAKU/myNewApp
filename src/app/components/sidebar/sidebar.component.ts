import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any = {};
  sidebarVisible: boolean = true;

  constructor(private sidebarService: SidebarService, private authService: AuthService,private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.sidebarService.sidebarVisible$.subscribe(
      (visible) => (this.sidebarVisible = visible)
    );
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    console.log('SidebarComponent initialized');
    this.userService.getUserProfile().subscribe({
      next: (data: any) => {
        console.log('User profile data:', data);
        this.user = data;
      },
      error: (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
