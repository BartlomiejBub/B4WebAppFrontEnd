import { T } from '../../i18n/language';

// provides meal times for other services and database
export const MEAL_TIMES = [
    { value: 1, label: T.meals.breakfast, addTitle: T.meals.addToBreakfast },
    { value: 2, label: T.meals.secondBreakfast, addTitle: T.meals.addToSecondBreakfast },
    { value: 3, label: T.meals.lunch, addTitle: T.meals.addToLunch },
    { value: 4, label: T.meals.snack, addTitle: T.meals.addToSnack },
    { value: 5, label: T.meals.dinner, addTitle: T.meals.addToDinner }
];
