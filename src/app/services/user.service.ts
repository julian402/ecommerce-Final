import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  constructor() {}

  register(formData: FormData) {
    return this.http.post('http://54.175.125.154:3000/api/users', formData);
  }

  login(datosDelUsuario: { email: string; password: string }) {
    return this.http.post(
      'http://54.175.125.154:3000/api/login',
      datosDelUsuario
    );
  }

  isLogged() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('user_token')) {
        return true;
      } else {
        return false;
      }
    }
    return false
  }
}
