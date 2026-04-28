import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiServerUrl = 'http://localhost:8080/api/v1'

  constructor(private http: HttpClient){

  }

  public getUsers(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}/user`);
  }

  public addUser(user: User): Observable<User>{
    return this.http.post<any>(`${this.apiServerUrl}/user`, user);
  }

  public registerUser(user: User): Observable<User>{
    return this.http.post<any>(`${this.apiServerUrl}/registration`, user);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<any>(`${this.apiServerUrl}/user`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<any>(`${this.apiServerUrl}/user/${userId}`);
  }

  public loginUser(login: string, password: string): Observable<any>{
    const authRequest = {
      login: login, 
      password: password
    };
    return this.http.post<any>(`${this.apiServerUrl}/user/login/try`, authRequest);
  }
}
