import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authentifiaction/auth.service';
import { CommonModule } from '@angular/common';

import { OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class  ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  onSubmit() {
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
  }
}
