import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        map(response => {
          if (response.success && response.twoFactorRequired) {
            return response;
          } else if (response.success) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          return response;
        }),
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
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) } : {};
  }

  getUserRole(): string | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return user ? user.role : null;
    }
    return null;
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/utilisateurs/profil`, this.getAuthHeaders())
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Erreur lors de la récupération du profil utilisateur', error);
          return of(null);
        })
      );
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
