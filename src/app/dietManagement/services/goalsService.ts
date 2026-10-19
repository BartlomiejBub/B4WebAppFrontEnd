import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../../AAMain/api';
import { DEFAULT_GOALS, UserGoals } from './AA-UserGoals';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {

  private apiServerUrl = API_URL;
  // simple service made for getting and saving user goals
  public goals = signal<UserGoals>(DEFAULT_GOALS);

  constructor(private http: HttpClient) {
  }

  public getGoals(): void {
    this.http.get<UserGoals>(`${this.apiServerUrl}user/${localStorage.getItem("userID")}/goals`).subscribe((response) => {
      this.goals.set(response);
    });
  }

  public saveGoals(goals: UserGoals): Observable<UserGoals> {
    return this.http.put<UserGoals>(`${this.apiServerUrl}user/${localStorage.getItem("userID")}/goals`, goals).pipe(
      tap((response) => this.goals.set(response))
    );
  }
}
