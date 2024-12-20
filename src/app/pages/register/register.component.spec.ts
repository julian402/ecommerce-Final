// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RegisterComponent } from './register.component';
// import { UserService } from '../../services/user.service';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//   let routerSpy: jasmine.SpyObj<Router>;

//   // Definir el archivo mock al inicio
//   const mockFile = new File(['avatar content'], 'avatar.png', { type: 'image/png' });

//   beforeEach(async () => {
//     userServiceSpy = jasmine.createSpyObj('UserService', ['register']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, RegisterComponent], // Importar RegisterComponent
//       providers: [
//         { provide: UserService, useValue: userServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   beforeEach(() => {
//     userServiceSpy.register.calls.reset(); // Resetea las llamadas anteriores antes de cada test
//   });

//   it('debería crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debería inicializar el formulario correctamente', () => {
//     expect(component.registerForm).toBeDefined();
//     expect(component.registerForm.get('name')?.value).toBe('');
//     expect(component.registerForm.get('lastName')?.value).toBe('');
//     expect(component.registerForm.get('email')?.value).toBe('');
//     expect(component.registerForm.get('password')?.value).toBe('');
//     expect(component.registerForm.get('avatar')?.value).toBeNull();
//     expect(component.registerForm.get('typeUser')?.value).toBe('Customer');
//   });

//   it('debería manejar la carga de un archivo correctamente', () => {
//     const input = fixture.debugElement.nativeElement.querySelector('input[type="file"]');
//     const mockFile = new File(['file content'], 'filename.txt', { type: 'text/plain' });

//     // Simular un evento de cambio con el archivo adjunto
//     const event = new Event('change');
//     Object.defineProperty(event, 'target', {
//       value: { files: [mockFile] },
//     });

//     input.dispatchEvent(event); // Disparar el evento de cambio
//     fixture.detectChanges();

//     expect(component.registerForm.get('avatar')?.value).toEqual(mockFile);
//   });

//   it('debería registrar un usuario correctamente y redirigir a login', () => {
//     component.registerForm.setValue({
//       name: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'Password123',
//       avatar: mockFile,
//       typeUser: 'Customer',
//     });

//     const mockSuccessResponse = { status: 200, message: 'Usuario registrado' };
//     userServiceSpy.register.and.returnValue(of(mockSuccessResponse));

//     spyOn(Swal, 'fire');

//     component.onSubmit();

//     expect(userServiceSpy.register).toHaveBeenCalled();
//     expect(Swal.fire).toHaveBeenCalledWith('Se ha registrado un usuario', '', 'success');
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//   });

//   it('debería mostrar un mensaje de error si el registro falla', () => {
//     const mockErrorResponse = { status: 400, error: { message: 'Error en el registro' } };

//     // Simular el error de registro
//     userServiceSpy.register.and.returnValue(throwError(mockErrorResponse));

//     spyOn(Swal, 'fire');

//     component.onSubmit();

//     // Verificar si Swal.fire fue llamado con el mensaje de error esperado
//     expect(Swal.fire).toHaveBeenCalledWith('Error en el registro', 'Valide la informacion ingresada', 'error');
//   });

//   it('debería manejar la validación del formulario al enviar sin completar', () => {
//     component.registerForm.setValue({
//       name: '',
//       lastName: '',
//       email: '',
//       password: '',
//       avatar: null,
//       typeUser: 'Customer',
//     });

//     spyOn(Swal, 'fire');

//     component.onSubmit();

//     // Verifica que no se haya llamado al servicio de registro porque el formulario es inválido
//     expect(userServiceSpy.register).not.toHaveBeenCalled();
//     expect(Swal.fire).toHaveBeenCalledWith('Error en el registro', 'Valide la informacion ingresada', 'error');
//   });
// });
