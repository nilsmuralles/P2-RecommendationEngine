import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'register-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userRegistered = new User();
  usersService = inject(UsersService);

  async saveUser(registerForm:NgForm){
    const response = await this.usersService.register(JSON.stringify(this.userRegistered).toString())
    console.log(response);
    alert(`Registro Existoso\nBienvenido ${this.userRegistered.name}`);
    registerForm.resetForm();
  }
}
