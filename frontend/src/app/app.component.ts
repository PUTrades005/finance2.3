// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';           // ← add this
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent }    from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,               // ← and this
    DashboardComponent,
    UsersComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finance2.3';
  menuOpen = false;
  toggleMenu() { this.menuOpen = !this.menuOpen; }
}
