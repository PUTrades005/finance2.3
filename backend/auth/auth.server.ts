// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../frontend/environments/environment';

export interface User {
  sub: string;
  email: string;
  // add additional JWT claims here if needed
}

interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/auth`;
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.setUserFromToken(token);
    }
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.base}/register`, data);
  }

  login(creds: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, creds).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.setUserFromToken(res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  get isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  private setUserFromToken(token: string) {
    try {
      const decoded = jwtDecode<User>(token);
      this.userSubject.next(decoded);
    } catch (e) {
      console.error('Invalid JWT token', e);
      this.userSubject.next(null);
    }
  }
}
