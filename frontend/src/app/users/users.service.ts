// src/app/services/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * User model matching backend contract
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all users
   */
  list(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /**
   * Fetch a single user by ID
   */
  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new user
   */
  create(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  /**
   * Update an existing user
   */
  update(id: string, user: Partial<Omit<User, 'id'>>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  /**
   * Delete a user
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
