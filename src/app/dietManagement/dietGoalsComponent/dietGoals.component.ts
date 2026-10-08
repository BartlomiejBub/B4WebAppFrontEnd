
import { Component, computed, linkedSignal, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../AAMain/appService';
import { GoalsService } from '../services/goalsService';
import { DEFAULT_GOALS, UserGoals } from '../services/AA-UserGoals';
import { ACTIVITY_LEVELS, BodyParameters, GOAL_TYPES, GoalType, Sex, calculateGoals, isValidBodyParameters } from '../services/calorieCalculator';
import { ToastService } from '../../AAMain/toastService';
import { T } from '../../i18n/language';


// Just a component with same logic as others, nothing new to tell about althrough project, reading data from database
// with a possibility to change them the way user want - by a calculator or by hand
@Component({
  selector: 'app-diet-goals',
  templateUrl: './dietGoals.component.html',
  styleUrls: ['./dietGoals.component.css']
})
export class DietGoalsComponent {

  public t = T;

  public kcal = linkedSignal(() => this.goalsService.goals().goalKcal);
  public protein = linkedSignal(() => this.goalsService.goals().goalProtein);
  public fat = linkedSignal(() => this.goalsService.goals().goalFat);
  public carbs = linkedSignal(() => this.goalsService.goals().goalCarbs);

  public savedMessage = signal<string>("");

  public mode = signal<'manual' | 'calculator'>('manual');

  public activityLevels = ACTIVITY_LEVELS;
  public goalTypes = GOAL_TYPES;
  public sex = signal<Sex>('male');
  public age = signal<number>(NaN);
  public weight = signal<number>(NaN);
  public height = signal<number>(NaN);
  public activity = signal<number>(1.55);
  public goalType = signal<GoalType>('maintain');

  private bodyParameters = computed<BodyParameters>(() => ({
    sex: this.sex(), age: this.age(), weight: this.weight(), height: this.height(),
    activity: this.activity(), goalType: this.goalType()
  }));
  public calculatorResult = computed(() =>
    isValidBodyParameters(this.bodyParameters()) ? calculateGoals(this.bodyParameters()) : null
  );

  public kcalFromMacros = computed(() => Math.round(this.protein() * 4 + this.fat() * 9 + this.carbs() * 4));

  public macrosDifferFromKcal = computed(() =>
    this.kcal() > 0 && Math.abs(this.kcalFromMacros() - this.kcal()) > this.kcal() * 0.1
  );

  public isFormValid = computed(() =>
    [this.kcal(), this.protein(), this.fat(), this.carbs()].every((value) => Number.isFinite(value) && value >= 0)
  );

  constructor(private toast: ToastService, public goalsService: GoalsService, public appService: AppService) {
  }

  ngOnInit() {
    this.appService.updateDateView();
    this.goalsService.getGoals();
  }

  public toNumber(value: string): number {
    return value.trim() === "" ? NaN : Number(value);
  }

  public onInputChanged(): void {
    this.savedMessage.set("");
  }

  public restoreDefaults(): void {
    this.kcal.set(DEFAULT_GOALS.goalKcal);
    this.protein.set(DEFAULT_GOALS.goalProtein);
    this.fat.set(DEFAULT_GOALS.goalFat);
    this.carbs.set(DEFAULT_GOALS.goalCarbs);
    this.savedMessage.set("");
  }

  public onSaveGoals(): void {
    if (!this.isFormValid()) {
      this.toast.error(T.goals.invalidGoalsToast);
      return;
    }
    this.saveGoals({
      goalKcal: this.kcal(),
      goalProtein: this.protein(),
      goalFat: this.fat(),
      goalCarbs: this.carbs()
    });
  }

  public useCalculatorResult(): void {
    const result = this.calculatorResult();
    if (!result) return;
    this.kcal.set(result.goals.goalKcal);
    this.protein.set(result.goals.goalProtein);
    this.fat.set(result.goals.goalFat);
    this.carbs.set(result.goals.goalCarbs);
    this.mode.set('manual');
    this.saveGoals(result.goals);
  }

  private saveGoals(goals: UserGoals): void {
    this.goalsService.saveGoals(goals).subscribe({
      next: () => this.savedMessage.set(T.goals.saved),
      error: (error: HttpErrorResponse) => this.toast.error(error.error?.message ?? T.goals.saveError)
    });
  }

}
