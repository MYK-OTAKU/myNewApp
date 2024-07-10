import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TwoFactorAuthComponent } from '../two-factor-auth/two-factor-auth.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, TwoFactorAuthComponent, ChangePasswordComponent,ResetPasswordComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  twoFactorRequired: boolean = false;
  twoFactorToken: string = ''; // Token temporaire pour 2FA
  qrCodeUrl: string = ''; // URL du QR code pour 2FA

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response.success && response.twoFactorRequired) {
        this.twoFactorRequired = true;
        this.twoFactorToken = response.token;
        this.qrCodeUrl = response.qrCodeUrl || ''; // Si le QR code est fourni, affichez-le
      } else if (response.success) {
        localStorage.setItem('auth_token', response.token); // Stockage du jeton
        this.router.navigate(['/dashboard']);
      } else {
        this.loginFailed = true;
      }
    });
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
