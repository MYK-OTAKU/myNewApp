import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authentifiaction/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  isTokenPresent: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => {
      this.token = params['token'] || '';
      this.isTokenPresent = !!this.token;
    });
  }

  onSubmit() {
    if (this.isTokenPresent) {
      if (this.newPassword !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      this.authService.resetPassword(this.token, this.newPassword).subscribe(response => {
        if (response) {
          alert('Mot de passe réinitialisé avec succès');
          this.router.navigate(['/login']);
        } else {
          alert('Erreur lors de la réinitialisation du mot de passe');
        }
      });
    } else {
      this.authService.requestPasswordReset(this.email).subscribe(response => {
        if (response) {
          alert('Un e-mail de réinitialisation a été envoyé');
          this.router.navigate(['/login']);
        } else {
          alert('Erreur lors de la demande de réinitialisation du mot de passe');
        }
      });
    }
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}
