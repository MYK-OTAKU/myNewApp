import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/authentifiaction/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  @Input() qrCodeUrl: string = '';
  @Output() success = new EventEmitter<any>();

  twoFactorCode: string = '';
  verificationFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onVerifyTwoFactor() {
    this.authService.verifyTwoFactor(this.token, this.twoFactorCode).subscribe(success => {
      if (success) {
        this.success.emit({ token: this.token }); // Emit the token or relevant response
      } else {
        this.verificationFailed = true;
      }
    });
  }
}
