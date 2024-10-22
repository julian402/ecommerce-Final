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
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
    }
  }
}
