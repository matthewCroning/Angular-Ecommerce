import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface LoginData {
  username: string,
  password: string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username!: string; 
  private userId!: string;
  private token!: string;
  private admin!: string;

  constructor(private http: HttpClient) {}

  private saveToken(token: any) {
    localStorage.setItem('auth', JSON.stringify(token));
    return token;
  }

  private parseJwt (token: any) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');

      return JSON.parse(window.atob(base64));
    }

    return {};
  }

  private getToken(): string {
    if (this.token) return this.token;

    if (this.isAuthenticated()) {
      return this.token = JSON.parse(localStorage.getItem('auth')!).token;
    }

    return '';
  }


  public register(user: User): Observable<any> {
    return this.http.post('/api/auth/register', user);
  }

  public login(loginData: LoginData): Observable<any> {
    return this.http.post('/api/auth/login', loginData).pipe(map(token => this.saveToken(token)));   
  }

  public isAuthenticated(): boolean {
    // Check if token is not expired
    return !!localStorage.getItem('auth');
  }

  public logout(): Observable<any> {
    console.log("logging out");
    localStorage.removeItem('auth');
    this.token = '';
    this.username = '';

    return new Observable(observer => {
      if (!!localStorage.getItem('auth')) {
        observer.error(new Error("Token not removed"));
      } else {
        observer.next();
      }
    });
  }

  public getUsername(): string {
    if (this.username) return this.username;

    return this.username = this.parseJwt(this.getToken()).username;
  }

  public getUserId(): string {
    if (this.userId) return this.userId;

    return this.userId = this.parseJwt(this.getToken()).userId;
  }

  public isAdmin(): boolean{
    return this.parseJwt(this.getToken()).admin;
  }

  public getIsAdmin(): boolean{
    return this.parseJwt(this.getToken()).admin;
  }

  public getAuthToken(): any {
    const auth = localStorage.getItem('auth');

    return auth ? `Bearer ${JSON.parse(auth).token}` : '';
  }

}
  