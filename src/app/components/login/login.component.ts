import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';

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
  status = 200;

  constructor(private router: Router){}

  async login(loginForm:NgForm) {
    await this.usersService.login(JSON.stringify(this.userOnLogin).toString()).then(response =>{
      this.router.navigateByUrl(`/recomendation/${response.name}`)
    }).catch(error =>{
      if(error.status == 401){
        alert("Credenciales no válidas, intentelo de nuevo")
      }else if (error.status == 500){
        alert("Usuario no registrado")
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