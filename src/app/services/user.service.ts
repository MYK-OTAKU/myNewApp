import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3200/api/utilisateurs/'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour obtenir les en-têtes d'authentification
  getAuthHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) } : {};
  }

  getUserProfile(): Observable<any> {
    console.log('Fetching user profile from:', `${this.baseUrl}`);
    return this.http.get<any>(`${this.baseUrl}profil`, this.getAuthHeaders()).pipe(
      map(response => {
        console.log('Response from backend:', response);
        if (response && response.données) {
          return response.données; // Assurez-vous que les données utilisateur sont accessibles
        } else {
          throw new Error('Données utilisateur non trouvées');
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération du profil utilisateur', error);
        return of(null);
      })
    );
  }
}
