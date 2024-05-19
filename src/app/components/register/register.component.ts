import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'register-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  userRegistered = new User();
  usersService = inject(UsersService);
  router = new Router;

  async saveUser(){
    this.usersService.createUser(this.userRegistered);
    this.router.navigateByUrl('/genre-survey');
  }
}
