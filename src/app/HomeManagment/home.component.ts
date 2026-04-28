import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../AAMain/appService';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public isLoginModalOpen: boolean = false;
  public appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  public openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  public closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

   public onLoginSubmit(email: string, pass: string): void {
    
    this.closeLoginModal();
  }
  
}
