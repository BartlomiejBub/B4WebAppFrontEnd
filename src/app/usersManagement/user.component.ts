import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User, UserRole } from './services/user';
import { UserService } from './services/userService';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../AAMain/toastService';
import { T } from '../i18n/language';

@Component({
  selector: 'user-component',
  imports: [/*RouterOutlet,*/ CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  
  public users: User[];
  public allUsers: User[];
  public selectedUser: User | null = null;
  public activeModal: string | null = null;
  public t = T;


  constructor(private toast: ToastService, private userService: UserService, private cdr: ChangeDetectorRef) {
    this.users = [];
    this.allUsers = [];
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.allUsers = response;
        this.users = response;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.toast.error(error.error?.message ?? error.message);
        this.cdr.detectChanges();
      }
    });
  }

  public onOpenAddModal(): void {
    this.activeModal = 'add';
  }

  public onOpenUserModal(user: User, mode: string): void {
    this.selectedUser = user;
    this.activeModal = mode;
  }

  public closeModal(): void {
    this.activeModal = null;
    this.selectedUser = null;
  }

  public deleteUser(userId: number | null | undefined ): void {
    if(userId != null && userId != undefined){
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.getUsers();
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.toast.error(error.error?.message ?? error.message);
        this.cdr.detectChanges();
      }
    });
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
        this.toast.error(T.admin.addError(error.error?.message ?? error.message));
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
        this.toast.error(T.admin.editError(error.error?.message ?? error.message));
      }
    });
    }
  }

  public onSearchUsers(searchInput: string){
  
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

