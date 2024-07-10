import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-two-factor-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent {
  @Input() token: string = '';
  @Input() qrCodeUrl: string = ''; // URL du QR code pour 2FA
  twoFactorCode: string = '';
  verificationFailed: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onVerifyTwoFactor() {
    this.authService.verifyTwoFactor(this.token, this.twoFactorCode).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.verificationFailed = true;
      }
    });
  }
}
