import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private url: String;

  constructor() {
    this.url = 'http://localhost:8080/api/v1/users';
  }

  register(user: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return firstValueFrom(this.httpClient.post<any>(`${this.url}/add`, user, httpOptions));
  }

  login(user: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return firstValueFrom(this.httpClient.post<any>(`${this.url}/login`, user, httpOptions));
  }
}
