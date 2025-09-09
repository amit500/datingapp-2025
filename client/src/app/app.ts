import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
// import { AccountService } from '../core/services/account-service';
import { User } from '../types/user';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // private accountService = inject(AccountService);
  protected router = inject(Router);
  private http = inject(HttpClient);  
  protected readonly title = 'Dating App';
  protected members = signal<User[]>([]);

  // ngOnInit(): void {
  //   this.http.get<any[]>('http://localhost:5001/api/members').subscribe({

  //     next: response => this.members.set(response),
  //     error: error => console.error(error),
  //     complete: () => console.log('Complete the http request')
  //   })
  // }

  async ngOnInit() {
    this.members.set(await this.getMembers());
    // this.setCurrentUser();
  }

  // setCurrentUser() {
  //   const userString: any = localStorage.getItem('user');
  //   if (!userString) return;
  //   const user = JSON.parse(userString);
  //   this.accountService.currentUser.set(user);
  // }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get<User[]>(`http://localhost:5001/api/members`));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
