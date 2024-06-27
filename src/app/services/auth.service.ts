import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3200/api'; // Assurez-vous que l'URL de votre backend est correcte
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/login`, { nomUtilisateur: username, motDePasse: password })
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
          console.error('Erreur lors de la connexion', error);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
