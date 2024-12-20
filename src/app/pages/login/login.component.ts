import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService
        .login(this.loginForm.value as { email: string; password: string })
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.authService.setToken(response.token);
            // localStorage.setItem('token', response.token);
            Swal.fire('Se ha Logeado','','success')
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            Swal.fire('No se pudo Logear',error.error.error,'error')
            console.error(error);
          },
        });
    }
  }
}
