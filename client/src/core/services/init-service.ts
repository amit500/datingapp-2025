import { Inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = Inject(AccountService);

  init(){
    const userString: any = localStorage.getItem('user');
    if (!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);

    return of(null)
  }
}
