import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserRole } from '../usersManagement/services/user';
import { T } from '../i18n/language';

// this is a base Service, most top one which contains some important global data, signals and functions to set them

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
  public selectedTimeOfDay = signal<number>(0);
  public isLoginModalOpen = signal<boolean>(false);

  public openLoginModal(): void {
    this.isLoginModalOpen.set(true);
  }

  public closeLoginModal(): void {
    this.isLoginModalOpen.set(false);
  }

  // date function to work in every case
  public toLocalDateString(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  public isLoggedIn(): boolean {
    return this.loggedUser() !== null;
  }

  // some session variables that help about identyfying client - nothing is confirmed with tokens yet but it will be !!!!
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

  // function that changes date of visible diet date and days earlier/later
  public updateDateView() {
    let current = this.currentDateObject;
    this.currentDateString.set(this.toLocalDateString(current));
    this.currentMonthName.set(current.toLocaleDateString(T.locale, { month: 'long', year: 'numeric' }));

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