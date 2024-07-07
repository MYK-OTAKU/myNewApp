import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:3200/api/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }
}
