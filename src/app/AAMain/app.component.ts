import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserService } from '../usersManagement/services/userService';
import { AppService } from './appService';
import { UserRole } from '../usersManagement/services/user';
import { ToastService } from './toastService';
import { T } from '../i18n/language';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public adminRole: UserRole = UserRole.ADMIN;
  public userRole: UserRole = UserRole.USER;
  public t = T;

  constructor(public toast: ToastService, private userService: UserService, public appService: AppService, private router: Router) {
  }

  public openLoginModal(): void {
    this.appService.openLoginModal();
  }

  public closeLoginModal(): void {
    this.appService.closeLoginModal();
  }

  public onLoginSubmit(login: string, password: string): void {
    this.userService.loginUser(login, password).subscribe({
      next: (response: any) => {
        if(response.response === "SUCCESS"){
          this.toast.success(T.login.loggedInAs(response.login));
          this.router.navigate(['/home']);
          this.closeLoginModal();
          this.appService.setSession(response.login, response.userRole, response.userID);
        } else if(response.response === "WRONG PASSWORD"){
          this.toast.error(T.login.wrongPassword);
        } else {
          this.toast.error(T.login.wrongLogin);
        }
      },
      error: (error) => {
        this.toast.error(T.login.serviceError);
      }
    });
  }

}
