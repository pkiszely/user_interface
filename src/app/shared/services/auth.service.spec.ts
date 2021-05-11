import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { UserDto } from 'src/app/user/dtos/user.dto';
import { environment } from 'src/environments/environment';

fdescribe('AuthService', () => {
  let httpMock: HttpTestingController;
  let service: AuthService;
  let user: UserDto;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.inject(AuthService);
    user = {
      id: 1,
      name: 'Tobias Test',
      email: 'test@example.com',
      password: 'secret'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can log in', (done) => {
    service.login(user).subscribe({
      next: response => {
        expect(response.user).toEqual(user);
        expect(response.token).toBe('someToken');

        expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
        expect(localStorage.getItem('token')).toBe('someToken');

        done();
      }
    });
    const loginRequest = httpMock.expectOne(environment.apiEndpoint + '/auth');
    loginRequest.flush({ user, token: 'someToken' });
  });

  it('can log out', () => {
    service.user = user;
    service.token = 'someToken';
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'someToken');

    service.logout();

    expect(service.user).toBeUndefined();
    expect(service.token).toBeUndefined();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();

  });
});
