// src/app/auth/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  creds = { email: '', password: '' };
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = null;
    this.auth.login(this.creds).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = err.error?.message || 'Login failed'
    });
  }
}
