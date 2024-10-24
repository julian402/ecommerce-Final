import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);
  localStorage = this.document.defaultView?.localStorage;
  constructor() {}

  register(formData: FormData) {
    return this.http.post('http://localhost:3000/api/users', formData);
  }

  login(datosDelUsuario: { email: string; password: string }) {
    return this.http.post('http://localhost:3000/api/login', datosDelUsuario);
  }

  isLogged() {
    if (localStorage.getItem('user_token')) {
      return true;
    } else {
      return false;
    }
  }
}
