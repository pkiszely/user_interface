import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public register(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      environment.apiEndpoint + '/user/register',
      user
    );
  }
}
