import { Recipe } from "./recipe";

export interface RecipeAddRequest {
    recipe: Recipe;
    listOfProducts: number[];
}