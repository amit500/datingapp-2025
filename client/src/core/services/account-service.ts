import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal, WritableSignal } from '@angular/core';
import {LoginCreds, RegisterCreds, User} from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser: WritableSignal<any> = signal(null); 
  // currentUser = signal<User | null>(null);

  baseUrl = 'http://localhost:5001/api';

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + '/account/register', creds).pipe(
      tap(user => {
        if (user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  login(creds: LoginCreds) {
    // return this.http.post(`${this.baseUrl}/login`, creds);
    return this.http.post<User>(this.baseUrl + '/account/login', creds).pipe(
      tap(user => {
        if (user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}

