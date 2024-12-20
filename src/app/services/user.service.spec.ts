import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  
  let localStorageMock: { [key: string]: string | null };

  beforeEach(() => {
      localStorageMock = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete localStorageMock[key];
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia registrar un nuevo usuario y retornar una respuesta', () => {
    const mockFormData = new FormData();
    mockFormData.append('email', 'test@example.com');
    mockFormData.append('password', 'password123');

    const mockResponse = { message: 'User registered successfully' };

    service.register(mockFormData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('Deberia logear un usuario y retornar un token', () => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    const mockLoginResponse = { token: 'fake-jwt-token' };

    service.login(loginData).subscribe(response => {
      expect(response).toEqual(mockLoginResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('Deberia verificar si el usuario esta logueado', () => {
    localStorageMock['user_token'] = 'fake-jwt-token';  // Simula un token en el localStorage
    expect(service.isLogged()).toBeTrue();

    localStorageMock['user_token'] = null;  // Elimina el token simulado
    expect(service.isLogged()).toBeFalse();
  });
});