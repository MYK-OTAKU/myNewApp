// src/app/components/dashboard/dashboard.component.ts
import { Component, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuComponent } from '../menu/menu.component';
import { MaincontentComponent } from '../maincontent/maincontent.component';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { ViewTemplateComponent } from '../view-template/view-template.component';
import { CategoriesComponent } from '../categories/categories.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import {  ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    MenuComponent,
    MaincontentComponent,
    ViewTemplateComponent,
    CategoriesComponent,
    KitchenComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarVisible: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService,
    @Inject(Router) private router: Router
  ) {
    this.sidebarService.sidebarVisible$.subscribe(
      (visible) => (this.sidebarVisible = visible)
    );

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
}
}
