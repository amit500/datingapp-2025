import { inject,Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Result } from 'postcss';
import { signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {}
  // protected loggedIn = signal(false)
  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');
        this.toast.success('Login Successful');
        // console.log(result);
        // this.loggedIn.set(true);
        this.creds = {};
      },
      error: error => {
        this.toast.error(error.error);
      }
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  }