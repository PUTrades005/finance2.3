// src/app/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Use absolute path import for environment
import { environment } from '../../../environments/environment'

export interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  newUser: Partial<User> = { name: '', email: '' };
  editingUser: User | null = null;

  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(this.apiUrl)
      .subscribe(data => this.users = data, err => console.error(err));
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.email) return;
    this.http.post<User>(this.apiUrl, this.newUser)
      .subscribe(user => {
        this.users.push(user);
        this.newUser = { name: '', email: '' };
      }, err => console.error(err));
  }

  selectUser(user: User) {
    this.editingUser = { ...user };
  }

  updateUser() {
    if (!this.editingUser) return;
    const url = `${this.apiUrl}/${this.editingUser.id}`;
    this.http.put<User>(url, this.editingUser)
      .subscribe(updated => {
        const idx = this.users.findIndex(u => u.id === updated.id);
        if (idx > -1) this.users[idx] = updated;
        this.editingUser = null;
      }, err => console.error(err));
  }

  deleteUser(id: string) {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      }, err => console.error(err));
  }

  cancelEdit() {
    this.editingUser = null;
  }
}
