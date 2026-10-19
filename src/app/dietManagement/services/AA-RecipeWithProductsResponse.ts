import { Product } from "./product";
import { Recipe } from "./recipe";

export interface RecipeWithProductsResponse {
    recipe: Recipe;
    products: Product[];
    weights: number[];
}
