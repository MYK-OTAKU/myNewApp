import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3200/api';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { nomUtilisateur: username, motDePasse: password })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Erreur lors de la connexion', error);
          return of({ success: false });
        })
      );
  }

  verifyTwoFactor(token: string, twoFactorCode: string): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/verify-2fa`, { token, twoFactorCode })
      .pipe(
        map(response => {
          if (response.success) {
            localStorage.setItem(this.tokenKey, response.token);
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.error('Erreur lors de la vérification 2FA', error);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/request-password-reset`, { email })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Erreur lors de la demande de réinitialisation du mot de passe', error);
          return of(false);
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/reset-password/${token}`, { newPassword })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Erreur lors de la réinitialisation du mot de passe', error);
          return of(false);
        })
      );
  }
}
