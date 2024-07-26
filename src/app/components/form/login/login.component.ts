import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/authentifiaction/auth.service';
import { TwoFactorAuthComponent } from '../two-factor-auth/two-factor-auth.component';
import { LoadingComponent } from '../../layouts/loading/loading.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, TwoFactorAuthComponent, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  twoFactorRequired: boolean = false;
  twoFactorToken: string = '';
  qrCodeUrl: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response.success && response.twoFactorRequired) {
        this.twoFactorRequired = true;
        this.twoFactorToken = response.token;
        this.qrCodeUrl = response.qrCodeUrl || '';
      } else if (response.success) {
        this.showLoading(response);
      } else {
        this.loginFailed = true;
      }
    });
  }

  showLoading(response: any) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      localStorage.setItem('auth_token', response.token);
      this.router.navigate(['/dashboard']);
    }, 2000); // Temps de chargement simulé, ajustez selon vos besoins
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  onTwoFactorSuccess(response: any) {
    this.showLoading(response);
  }
}
