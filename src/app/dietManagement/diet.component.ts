import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppService } from '../AAMain/appService';
import { ProductService } from './services/productService';
import { GoalsService } from './services/goalsService';
import { T } from '../i18n/language';

@Component({
  selector: 'app-diet',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css',
})
export class DietComponent {
  public t = T;

  // Cele użytkownika (ustawiane na stronie "Moje cele")
  public get maxKcal(): number { return this.goalsService.goals().goalKcal; }
  public get maxProteins(): number { return this.goalsService.goals().goalProtein; }
  public get maxFats(): number { return this.goalsService.goals().goalFat; }
  public get maxCarbs(): number { return this.goalsService.goals().goalCarbs; }

  constructor(public appService: AppService, public productService: ProductService, public goalsService: GoalsService) {
  }

  ngOnInit() {
    this.appService.currentDateObject = new Date();
    this.goalsService.getGoals();
  }

  public getPercent(current: number, max: number): number {
    if (max === 0) return 0;
    let percent = (current / max) * 100;
    return percent;
  }

  // "Zostało 420 kcal" albo "Ponad limit o 80 kcal"
  public remainingText(current: number, max: number, unit: string): string {
    const difference = Math.round((max - current) * 10) / 10;
    return difference >= 0 ? T.diet.remaining(difference, unit) : T.diet.overLimit(-difference, unit);
  }

  public isSameDay(date1: Date, date2String: string): boolean {
    return this.appService.toLocalDateString(date1) == date2String;
  }

  public getDayName(date: Date): string {
    return date.toLocaleDateString(T.locale, { weekday: 'short' });
  }

  public selectDate(date: Date) {
    this.appService.selectDate(date);
    this.productService.getProductsByUser();
  }

}
