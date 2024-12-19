import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);

    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'removeItem').and.callFake(() => {});
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería guardar el token en localStorage', () => {
    const testToken = 'test_token';
    service.setToken(testToken);
    expect(localStorage.setItem).toHaveBeenCalledWith('user_token', testToken);
  });

  it('debería eliminar el token de localStorage', () => {
    service.removeToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user_token');
  });
});
