// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RegisterComponent } from './register.component';
// import { UserService } from '../../services/user.service';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';

// describe('RegisterComponent', () => {
//     let component: RegisterComponent;
//     let fixture: ComponentFixture<RegisterComponent>;
//     let userServiceSpy: jasmine.SpyObj<UserService>;
//     let routerSpy: jasmine.SpyObj<Router>;

    
//     const mockFile = new File(['avatar content'], 'avatar.png', { type: 'image/png' });

//     beforeEach(async () => {
//         userServiceSpy = jasmine.createSpyObj('UserService', ['register']);
//         routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//         await TestBed.configureTestingModule({
//             imports: [ReactiveFormsModule],
//             providers: [
//                 { provide: UserService, useValue: userServiceSpy },
//                 { provide: Router, useValue: routerSpy },
//             ],
//         }).compileComponents();

//         fixture = TestBed.createComponent(RegisterComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('debería crear el componente', () => {
//         expect(component).toBeTruthy();
//     });

//     it('debería inicializar el formulario correctamente', () => {
//         expect(component.registerForm).toBeDefined();
//         expect(component.registerForm.get('name')?.value).toBe('');
//         expect(component.registerForm.get('lastName')?.value).toBe('');
//         expect(component.registerForm.get('email')?.value).toBe('');
//         expect(component.registerForm.get('password')?.value).toBe('');
//         expect(component.registerForm.get('avatar')?.value).toBeNull();
//         expect(component.registerForm.get('typeUser')?.value).toBe('Customer');
//     });

//     it('debería manejar la carga de un archivo correctamente', () => {
//         const input = fixture.debugElement.nativeElement.querySelector('input[type="file"]');

        
//         const mockFile = new File(['file content'], 'filename.txt', { type: 'text/plain' });

       
//         const event = new Event('change');
//         Object.defineProperty(event, 'target', {
//             value: { files: [mockFile] }
//         });

        
//         input.dispatchEvent(event);
//         fixture.detectChanges();

//         expect(component.registerForm.get('avatar')?.value).toEqual(mockFile);
//     });

//     it('debería registrar un usuario correctamente y redirigir a login', () => {
//         component.registerForm.setValue({
//             name: 'Daniel',
//             lastName: 'Ramirez',
//             email: 'daniel@example.com',
//             password: 'Password123',
//             avatar: mockFile,
//             typeUser: 'Customer',
//         });

//         const mockSuccessResponse = { status: 200, message: 'Usuario registrado' };
//         userServiceSpy.register.and.returnValue(of(mockSuccessResponse));

//         spyOn(Swal, 'fire');

//         component.avatar = mockFile;
//         component.onSubmit();

//         expect(userServiceSpy.register).toHaveBeenCalled();
//         expect(Swal.fire).toHaveBeenCalledWith('Se ha registrado un usuario', '', 'success');
//         expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//     });

//     it('debería mostrar un mensaje de error si el registro falla', () => {
//         const swalSpy = spyOn(Swal, 'fire');

       
//         const mockErrorResponse = { status: 400, message: 'Error en el registro' };
//         userServiceSpy.register.and.returnValue(throwError(mockErrorResponse));

//         component.registerForm.setValue({
//             name: 'Daniel',
//             lastName: 'Ramirez',
//             email: 'daniel@example.com',
//             password: 'Password123',
//             avatar: mockFile,
//             typeUser: 'Customer',
//         });

//         component.avatar = mockFile;
//         component.onSubmit();

//         // Verifica que Swal.fire se haya llamado con los parámetros correctos
//         expect(swalSpy).toHaveBeenCalledWith(
//             'Error en el registro',
//             'Valide la informacion ingresada',
//             'error'
//         );
//     });

//     it('no debería registrar si el formulario no es válido', () => {
//         component.registerForm.setValue({
//             name: '',
//             lastName: '',
//             email: '',
//             password: '',
//             avatar: null,
//             typeUser: 'Customer',
//         });

//         spyOn(Swal, 'fire');

//         component.onSubmit();

//         expect(userServiceSpy.register).not.toHaveBeenCalled();
//         expect(Swal.fire).not.toHaveBeenCalled();
//     });
// });
