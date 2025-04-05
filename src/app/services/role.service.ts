import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'https://rms-production-4a42.up.railway.app/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }
}
