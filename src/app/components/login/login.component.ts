import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userOnLogin = new User();
  usersService = inject(UsersService);

  async login(loginForm:NgForm) {
    const response = await this.usersService.login(JSON.stringify(this.userOnLogin).toString())
    console.log(response);
    loginForm.resetForm();
  }
}