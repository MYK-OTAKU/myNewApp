// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaincontentComponent } from './components/maincontent/maincontent.component';
import { SidebarService } from './services/sidebar.service';
import { AuthService } from './services/authentifiaction/auth.service';

import { LoginComponent } from './components/form/login/login.component';
import { ChangePasswordComponent } from './components/form/change-password/change-password.component';
import { ResetPasswordComponent } from './components/form/reset-password/reset-password.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  RouterOutlet,
    CommonModule,
    SidebarComponent,
    MenuComponent,
    MaincontentComponent,LoginComponent,ChangePasswordComponent,ResetPasswordComponent, MessageBoxComponent
    // MessageBoxComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMessageBox = false;
  messageBoxType: 'success' | 'error' | 'warning' | 'confirmation' = 'success';
  messageBoxTitle = '';
  messageBoxMessage = '';
  messageBoxIcon = '';

  showSuccessMessage() {
    this.messageBoxType = 'success';
    this.messageBoxTitle = 'Succès';
    this.messageBoxMessage = 'Enregistré avec succès ...';
    this.messageBoxIcon = 'path/to/success-icon.png';
    this.showMessageBox = true;
  }

  showErrorMessage() {
    this.messageBoxType = 'error';
    this.messageBoxTitle = 'Erreur';
    this.messageBoxMessage = 'Identifiant ou mot de passe incorrect';
    this.messageBoxIcon = 'path/to/error-icon.png';
    this.showMessageBox = true;
  }

  handleMessageBoxClose() {
    this.showMessageBox = false;
  }

  handleMessageBoxConfirm(result: boolean) {
    if (result) {
      console.log('Confirmed');
    } else {
      console.log('Not confirmed');
    }
    this.showMessageBox = false;
  }

  sidebarVisible: boolean = true;
  title = 'MyNewApp';

  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService,
    private router: Router
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
