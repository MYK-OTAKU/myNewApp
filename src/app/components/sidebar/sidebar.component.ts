// src/app/components/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any = {};

  constructor(private sidebarService: SidebarService, private userService: UserService) {}

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
}
