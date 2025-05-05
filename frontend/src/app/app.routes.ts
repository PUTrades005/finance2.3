// src/app/app.routes.ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
// Note: include .ts extension to ensure module resolution
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from './register.components';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export class AppRoutingModule {}
/**
 * Application route definitions.
 * Protected routes require AuthGuard.
 */
export const routes: Routes = [
  { path: '',         component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users',    component: UsersComponent,   canActivate: [AuthGuard] },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // catch-all redirects to dashboard
  { path: '**',       redirectTo: '' }
];
