import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User, UserRole } from '../usersManagment/user-service/user';
import { UserService } from '../usersManagment/user-service/user-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {
  public isLoginModalOpen: boolean = false;
  private userService: UserService;
  private router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }
  
  public openLoginModal(): void {
    this.router.navigate(['/home']);
    this.isLoginModalOpen = true;
  }

  public closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

   public onLoginSubmit(email: string, pass: string): void {
    this.router.navigate(['/home']);
  }

  public onAddUserRaw(name: string, surname: string, login: string, email: string, pass: string): void {
    
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
        console.log("Zarejestrowano, użytkownika!", response);
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        alert("Błąd podczas dodawania: " + error.message);
      }
    });
  }
  
}
