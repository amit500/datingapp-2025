import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  private accountService = inject(AccountService);
  membersFormApp = input.required<User[]>();
  cancelRegistration = output<boolean>();
  protected creds = {} as RegisterCreds;
  
  register() {
    this.accountService.register(this.creds).subscribe({
      next: (response: User) => {
        console.log(response);
        this.cancel();
      },
      error: (error: any) => {
        console.error('Registration failed:', error);
      }
    });
  }
  
  cancel() {
    this.cancelRegistration.emit(false);
  } 
}
