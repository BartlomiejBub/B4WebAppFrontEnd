import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User, UserRole } from './user-service/user';
import { UserService } from './user-service/user-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'user-component',
  imports: [/*RouterOutlet,*/ CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  //protected readonly title = signal('FrontEndApki');
  
  public users: User[];
  public allUsers: User[];
  public selectedUser: User | null = null;
  public activeModal: String | null = null;


  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
    this.users = [];
    this.allUsers = [];
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        console.log("ODPOWIEDŹ Z SERWERA:", response);
        this.allUsers = response;
        this.users = response;
        this.cdr.detectChanges();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.cdr.detectChanges();
      }
    );
  }

  public onOpenAddModal(): void {
    this.activeModal = 'add';
  }

  public onOpenUserModal(user: User, mode: String): void {
    this.selectedUser = user;
    this.activeModal = mode;
  }

  public closeModal(): void {
    this.activeModal = null;
    this.selectedUser = null;
  }

  public deleteUser(userId: number | null | undefined ): void {
    if(userId != null && userId != undefined){
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log("ODPOWIEDŹ Z SERWERA:", response);
        this.getUsers();
        this.closeModal();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.cdr.detectChanges();
      }
    )
  }
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
        console.log("Dodano użytkownika!", response);
        this.getUsers();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        alert("Błąd podczas dodawania: " + error.message);
      }
    });
  }

  public onEditUserRaw(name: string, surname: string, email: string, enabled: boolean, userRole: string): void {
    
    if(this.selectedUser != null){
      const newUser: User = {
        ID_User: this.selectedUser.ID_User, 
        name: name,
        surname: surname,
        login: this.selectedUser.login,
        password: this.selectedUser.password,
        email: email,
        userRole: UserRole.USER,
        enabled: enabled, 
        locked: this.selectedUser.locked
      }

      if(userRole === 'ADMIN'){
        newUser.userRole = UserRole.ADMIN;
      }

      this.userService.updateUser(newUser).subscribe({
      next: (response: User) => {
        console.log("Zmieniono dane użytkownika!", response);
        this.getUsers();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        alert("Błąd podczas edytowania: " + error.message);
      }
    });
    }
  }

  public onSearchUsers(searchInput: String){
  
    const results: User[] = [];
    
    for (const user of this.allUsers) {
      if (user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.surname.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.login.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.email.toLowerCase().includes(searchInput.toLowerCase())) {
            
        results.push(user);
      }
    }
    
    this.users = results; 

    if (!searchInput) {
      this.users = this.allUsers; 
    }
  }

}

