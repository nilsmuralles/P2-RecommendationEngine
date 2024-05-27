import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'login-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userOnLogin = new User();
  usersService = inject(UsersService);
  status = 200;
  loginFailed: boolean = false;

  constructor(private router: Router){}

  async login(loginForm:NgForm) {
    await this.usersService.login(JSON.stringify(this.userOnLogin).toString()).then(response =>{
      this.router.navigateByUrl(`/recomendation/${response.email}`)
      this.usersService.setCurrentUser(response);
    }).catch(error =>{
      if(error.status == 401 || error.status == 500){
        this.loginFailed = true;
      }
    })
    loginForm.resetForm();
    this.clear();
  }

  clear(){
    this.userOnLogin = new User();
    this.status = 200;
  }
}