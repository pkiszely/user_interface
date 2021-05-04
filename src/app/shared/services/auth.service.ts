import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/user/dtos/user.dto';
import { environment } from 'src/environments/environment';
import { AuthResponseDto } from '../dtos/auth-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  public user: UserDto;

  constructor(private http: HttpClient) {
      this.loadFromStorage();
   }

  login(user: UserDto): Observable<AuthResponseDto>{
    const observable = this.http.post<AuthResponseDto>(
      environment.apiEndpoint + '/auth',
      user
    );
    observable.subscribe({
      next: (response: AuthResponseDto) => {
        this.token = response.token;
        this.user = response.user;
        this.saveToStorage();
      },
      error: () => {
        this.logout();
      }
    });
    return observable;
  }

  public logout(): void {
    this.token = undefined;
    this.user = undefined;
    this.saveToStorage();
  }

  private saveToStorage(): void {
    if (this.token){
      localStorage.setItem('token', this.token);
    } else {
      localStorage.removeItem('token');
    }
    if (this.user){
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.removeItem('user');
    }
  }

  private loadFromStorage(): void {
    this.token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
  }
}
