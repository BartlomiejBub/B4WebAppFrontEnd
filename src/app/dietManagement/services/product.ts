
export interface Product{
    ID_Product: number | undefined | null;
    name: string;
    caloric: number;
    protein: number;
    carbs: number;
    fat: number;
    gramsInOne: number;
    code: string;
    userID : number | undefined | null;
}