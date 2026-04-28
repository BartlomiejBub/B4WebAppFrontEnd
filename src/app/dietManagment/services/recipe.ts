export interface Recipe{
    ID_Recipe: number | undefined | null;

    name: String;
    header: String;
    description: String;

    timeToCook: number;

    caloric: number;
    protein: number;
    carbs: number;
    fat: number;

    gramsInOne: number;
    portion: number;
    userID: number | null | undefined;
}
