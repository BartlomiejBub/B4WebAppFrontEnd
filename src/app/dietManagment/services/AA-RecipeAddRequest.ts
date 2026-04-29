import { Recipe } from "./recipe";

export interface RecipeAddRequest {
    recipe: Recipe;
    productIDs: number[];
    weights: number[];
}