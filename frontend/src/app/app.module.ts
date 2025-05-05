// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Import your standalone components here:
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  // NO declarations for standalone components:
  declarations: [],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // Standalone components go into imports, not declarations:
    AppComponent,
    DashboardComponent,
  ],
})
export class AppModule {}
