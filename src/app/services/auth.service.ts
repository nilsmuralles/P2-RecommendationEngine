import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserEmail: string | null = null;

  constructor() {}
  
  setCurrentUserEmail(email: string) {
    this.currentUserEmail = email;
  }

  getCurrentUserEmail(): string | null {
    return this.currentUserEmail;
  }
}
