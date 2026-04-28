import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserRole } from '../usersManagment/user-service/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  public loggedUser: WritableSignal<string | null> = signal(localStorage.getItem('logged_user'));
  public currentDateObject: Date = new Date();
  public currentKcal = signal<number>(0);
  public currentCarbs = signal<number>(0);
  public currentProteins = signal<number>(0);
  public currentFats = signal<number>(0);
  public currentDateString = signal<string>('');
  public currentMonthName = signal<string>('');
  public visibleDays: Date[] = [];

  public isLoggedIn(): boolean {
    return this.loggedUser() !== null;
  }

  public setSession(login: string, role: string, userID: number): void {
    localStorage.setItem('logged_user', login);
    localStorage.setItem('role', role);
    localStorage.setItem('userID', userID.toString());
    this.loggedUser.set(login); 
  }

  public setCurrentKcalStats(kcal: number, carbs: number, proteins: number, fats: number): void {
    this.currentKcal.set(kcal);
    this.currentCarbs.set(carbs);
    this.currentProteins.set(proteins);
    this.currentFats.set(fats);
  }

  public logout(): void {
    localStorage.removeItem('logged_user');    
    localStorage.removeItem('role');
    localStorage.removeItem('userID');
    this.loggedUser.set(null); 
  }

  public getUserRole(): UserRole | null {
    if(localStorage.getItem('role') === 'ADMIN'){
      return UserRole.ADMIN;
    } else {
     return UserRole.USER;
    }
  }

  public getUserID(): number | null {
    const userID = localStorage.getItem('userID');
    return userID ? parseInt(userID) : null;
  }

  public getCurrentKcal(): number {
    return this.currentKcal();
  }

  public getCurrentCarbs(): number {
    return this.currentCarbs();
  }

  public getCurrentProteins(): number {
    return this.currentProteins();
  }

  public getCurrentFats(): number {
    return this.currentFats();
  }

  public updateDateView() {
    let current = this.currentDateObject;
    this.currentDateString.set(current.toISOString().split('T')[0]);
    this.currentMonthName.set(current.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }));

    this.visibleDays = [];
    for (let i = -3; i <= 3; i++) {
      let d = new Date(current);
      d.setDate(current.getDate() + i);
      this.visibleDays.push(d);
    }
  }

  public selectDate(date: Date) {
    this.currentDateObject = new Date(date);
    this.updateDateView();
  }

}