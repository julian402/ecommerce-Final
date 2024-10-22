import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  constructor() {}

  register(formData: FormData) {
    return this.http.post('http://localhost:3000/api/users', formData);
  }

  login(datosDelUsuario: { email: string; password: string }) {
    return this.http.post(
      'http://localhost:3000/api/users/login',
      datosDelUsuario
    );
  }
}
