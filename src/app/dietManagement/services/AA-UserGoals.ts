
export interface UserGoals {
    goalKcal: number;
    goalProtein: number;
    goalFat: number;
    goalCarbs: number;
}

// Default goals - same as in backend
export const DEFAULT_GOALS: UserGoals = {
    goalKcal: 2500,
    goalProtein: 160,
    goalFat: 80,
    goalCarbs: 280
};
