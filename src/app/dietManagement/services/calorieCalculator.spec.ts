import { BodyParameters, calculateBmr, calculateGoals, isValidBodyParameters } from './calorieCalculator';

/// Simple unit tests for calorieCalculator.ts testing work of algorithm that suggests daily calorie needs

describe('calorieCalculator', () => {
  const man: BodyParameters = { sex: 'male', age: 30, weight: 80, height: 180, activity: 1.55, goalType: 'maintain' };

  it('calculates BMR with Mifflin-St Jeor', () => {
    // 10*80 + 6.25*180 - 5*30 + 5 = 1780
    expect(calculateBmr(man)).toBe(1780);
    // woman 1780 - 5 - 161 = 1614
    expect(calculateBmr({ ...man, sex: 'female' })).toBe(1614);
  });

  it('calculates maintenance goals', () => {
    const result = calculateGoals(man);
    expect(result.tdee).toBe(2759);             // 1780 * 1.55
    expect(result.goals.goalKcal).toBe(2759);
    expect(result.goals.goalProtein).toBe(144); // 1.8 g * 80 kg
    expect(result.goals.goalFat).toBe(77);      // 25% kcal / 9
    expect(result.goals.goalCarbs).toBe(373);   // (2759 - 144*4 - 77*9) / 4 = 372.5
  });

  it('subtracts 500 kcal for weight loss and adds 300 for gain', () => {
    expect(calculateGoals({ ...man, goalType: 'lose' }).goals.goalKcal).toBe(2259);
    expect(calculateGoals({ ...man, goalType: 'gain' }).goals.goalKcal).toBe(3059);
  });

  it('never proposes less than 1200 kcal', () => {
    const small: BodyParameters = { sex: 'female', age: 80, weight: 40, height: 140, activity: 1.2, goalType: 'lose' };
    expect(calculateGoals(small).goals.goalKcal).toBe(1200);
  });

  it('macros add up to the kcal goal', () => {
    const g = calculateGoals(man).goals;
    expect(Math.abs(g.goalProtein * 4 + g.goalFat * 9 + g.goalCarbs * 4 - g.goalKcal)).toBeLessThan(10);
  });

  it('rejects unrealistic parameters', () => {
    expect(isValidBodyParameters(man)).toBe(true);
    expect(isValidBodyParameters({ ...man, age: 5 })).toBe(false);
    expect(isValidBodyParameters({ ...man, weight: NaN })).toBe(false);
  });
});
