import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../AAMain/appService';
import { ProductService } from './services/productService';

@Component({
  selector: 'app-diet',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css',
})
export class DietComponent {
  public isLoginModalOpen: boolean = false;
  public appService: AppService;
  public maxKcal: number = 2500;
  public maxProteins: number = 160;
  public maxFats: number = 80;
  public maxCarbs: number = 280;

  constructor(appService: AppService, public productService: ProductService) {
    this.appService = appService;
    this.productService = productService;
  }

  ngOnInit() {
    this.appService.currentDateObject = new Date();
  }

  public getPercent(current: number, max: number): number {
    if (max === 0) return 0;
    let percent = (current / max) * 100;
    return percent;
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

   public isSameDay(date1: Date, date2String: string): boolean {
    return date1.toISOString().split('T')[0] == date2String;
  }

  public getDayName(date: Date): string {
    return date.toLocaleDateString('pl-PL', { weekday: 'short' });
  }

  public selectDate(date: Date) {
    this.appService.selectDate(date);
    this.productService.getProductsByUser();
  }
  
}
