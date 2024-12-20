import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { of, throwError } from "rxjs";
import { MockBuilder, NG_MOCKS_ROOT_PROVIDERS } from 'ng-mocks';
import Swal from 'sweetalert2';

describe('LoginComponent Test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => MockBuilder(UserService, LoginComponent)
    .keep(NG_MOCKS_ROOT_PROVIDERS) 
  );

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['login']);
    const authSpy = jasmine.createSpyObj('AuthService', ['setToken']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it("Debería crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería hacer login correctamente y redirigir a la página principal", () => {
    const mockResponse = { token: 'fake-jwt-token' };
    const mockFormData = { email: 'test@example.com', password: 'password' };

    // Establecer valores en el formulario
    component.loginForm.setValue(mockFormData);

    // Configurar el spy para que devuelva una respuesta exitosa
    userServiceSpy.login.and.returnValue(of(mockResponse));

    // Espiar la llamada a Swal.fire
    spyOn(Swal, 'fire').and.callThrough();

    // Llamar al método onSubmit()
    component.onSubmit();

    // Verificar que el login fue exitoso
    expect(userServiceSpy.login).toHaveBeenCalledWith(mockFormData);
    expect(authServiceSpy.setToken).toHaveBeenCalledWith(mockResponse.token);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(Swal.fire).toHaveBeenCalledWith('Se ha Logeado', '', 'success');
  });

  it("Debería manejar el error de login correctamente", () => {
    const mockErrorResponse = { error: { error: 'Invalid credentials' } };
    const mockFormData = { email: 'test@example.com', password: 'wrongpassword' };

    // Establecer valores en el formulario
    component.loginForm.setValue(mockFormData);

    // Configurar el spy para que devuelva un error
    userServiceSpy.login.and.returnValue(throwError(mockErrorResponse));

    // Espiar la llamada a Swal.fire
    spyOn(Swal, 'fire').and.callThrough();

    // Llamar al método onSubmit()
    component.onSubmit();

    // Verificar que el error fue manejado correctamente
    expect(userServiceSpy.login).toHaveBeenCalledWith(mockFormData);
    expect(Swal.fire).toHaveBeenCalledWith('No se pudo Logear', mockErrorResponse.error.error, 'error');
  });

  it("Debería mostrar un mensaje de error si el formulario no es válido", () => {
    // Dejar el formulario vacío o inválido
    component.loginForm.setValue({ email: '', password: '' });

    // Llamar al método onSubmit()
    component.onSubmit();

    // Verificar que no se haya llamado al servicio de login
    expect(userServiceSpy.login).not.toHaveBeenCalled();
  });
});