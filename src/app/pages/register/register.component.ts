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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  avatar: null | File = null;

  registerForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    lastname: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    avatar: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key in formValue) {
      if (
        formValue.hasOwnProperty(key) &&
        formValue[key] !== null &&
        formValue[key] !== undefined
      ) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.avatar) {
      formData.append('avatar', this.avatar, this.avatar.name);
    }
    console.log(formData.getAll('avatar'));
    return formData;
  }

  onSubmit() {
    if (this.registerForm.valid && this.avatar) {
      const formData = this.toFormData(this.registerForm.value);
      this.userService.register(formData).subscribe({
        next: (response) => {
          console.log('Se ha registrado un usuario');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
