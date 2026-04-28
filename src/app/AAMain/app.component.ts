import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserService } from '../usersManagment/user-service/user-service';
import { AppService } from './appService';
import { User, UserRole } from '../usersManagment/user-service/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private apiServerUrl = "localhost:8080/api/v1";
  public adminRole: UserRole = UserRole.ADMIN;
  public userRole: UserRole = UserRole.USER;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef, public appService: AppService, private router: Router) {
  }

  public isLoginModalOpen: boolean = false;
  
  public openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  public closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

  public onLoginSubmit(login: string, password: string): void {
    this.userService.loginUser(login, password).subscribe({
      next: (response: any) => {
        if(response.response === "SUCCESS"){
          alert("Zalogowano użytkownika! " + response.login);
          console.log("Zalogowano użytkownika! " + response.login);
          this.router.navigate(['/home']);
          this.closeLoginModal();
          this.appService.setSession(response.login, response.userRole, response.userID);
        } else if(response.response === "WRONG PASSWORD"){
          alert("Niepoprawne hasło!");
        } else {
          alert("Niepoprawny login!");
        }
      },
      error: (error) => {
        alert("Błąd usługi logowania");
      }
    });
  }

  ngOnInit() {
   
  }

}

