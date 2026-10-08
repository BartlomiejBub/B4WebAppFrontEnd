import { UserGoals } from "./AA-UserGoals";
import { T } from "../../i18n/language";


// the calculator is based on Mifflin-St Jeor formula and some simple rules for calculating macros
// and adjusting calories for weight loss or gain, algorithm is made with help of internet because I am not a dietitian


export type Sex = 'male' | 'female';
export type GoalType = 'lose' | 'maintain' | 'gain';

export interface BodyParameters {
    sex: Sex;
    age: number;      
    weight: number;    
    height: number;    
    activity: number;  
    goalType: GoalType;
}

export interface CalculatorResult {
    bmr: number;    
    tdee: number;   
    goals: UserGoals;
}

export const ACTIVITY_LEVELS = [
    { value: 1.2, label: T.goals.activityNone },
    { value: 1.375, label: T.goals.activityLow },
    { value: 1.55, label: T.goals.activityMedium },
    { value: 1.725, label: T.goals.activityHigh },
    { value: 1.9, label: T.goals.activityVeryHigh }
];

export const GOAL_TYPES: { value: GoalType, label: string }[] = [
    { value: 'lose', label: T.goals.goalLose },
    { value: 'maintain', label: T.goals.goalMaintain },
    { value: 'gain', label: T.goals.goalGain }
];

const GOAL_SETTINGS: Record<GoalType, { kcalChange: number, proteinPerKg: number }> = {
    lose: { kcalChange: -500, proteinPerKg: 2.0 },
    maintain: { kcalChange: 0, proteinPerKg: 1.8 },
    gain: { kcalChange: 300, proteinPerKg: 1.8 }
};

const MIN_KCAL = 1200;      
const FAT_KCAL_SHARE = 0.25; 

export function isValidBodyParameters(p: BodyParameters): boolean {
    return p.age >= 15 && p.age <= 100 &&
        p.weight >= 30 && p.weight <= 300 &&
        p.height >= 120 && p.height <= 250 &&
        p.activity > 0;
}

export function calculateBmr(p: BodyParameters): number {
    const base = 10 * p.weight + 6.25 * p.height - 5 * p.age;
    return p.sex === 'male' ? base + 5 : base - 161;
}

export function calculateGoals(p: BodyParameters): CalculatorResult {
    const settings = GOAL_SETTINGS[p.goalType];
    const bmr = calculateBmr(p);
    const tdee = bmr * p.activity;
    const kcal = Math.max(MIN_KCAL, Math.round(tdee + settings.kcalChange));

    const protein = Math.round(settings.proteinPerKg * p.weight);
    const fat = Math.round(kcal * FAT_KCAL_SHARE / 9);
    const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));

    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goals: { goalKcal: kcal, goalProtein: protein, goalFat: fat, goalCarbs: carbs }
    };
}
