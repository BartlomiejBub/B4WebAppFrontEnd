import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User, UserRole } from '../usersManagement/services/user';
import { UserService } from '../usersManagement/services/userService';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../AAMain/toastService';
import { T } from '../i18n/language';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {

  public t = T;

  constructor(private toast: ToastService, private userService: UserService, private router: Router) {
  }

  public onAddUserRaw(name: string, surname: string, login: string, email: string, pass: string, passConfirm: string): void {

    if (pass !== passConfirm) {
      this.toast.error(T.register.passwordsMismatch);
      return;
    }

    const newUser: User = {
      ID_User: null, 
      name: name,
      surname: surname,
      login: login,
      password: pass,
      email: email,
      userRole: UserRole.USER,
      enabled: false, 
      locked: false
    }

    this.userService.registerUser(newUser).subscribe({
      next: (response: User) => {
        this.toast.success(T.register.success);
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.toast.error(T.register.error(error.error?.message ?? error.message));
      }
    });
  }
  
}
