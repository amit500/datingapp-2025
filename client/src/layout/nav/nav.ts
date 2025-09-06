import { inject,Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Result } from 'postcss';
import { signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {}
  // protected loggedIn = signal(false)
  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        // this.loggedIn.set(true);
        this.creds = {};
      },
      error: error => alert(error.message)
    });
  }
  logout() {
    this.accountService.logout();
  }
  }