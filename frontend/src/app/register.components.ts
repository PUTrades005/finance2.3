import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // other components
  ],
  imports: [
    FormsModule,
    // other modules
  ],
})
export class AppModule {}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: '',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  username = '';
  password = '';

  register() {
    console.log('Registering user:', this.username);
    // Real logic would go here
  }
}
