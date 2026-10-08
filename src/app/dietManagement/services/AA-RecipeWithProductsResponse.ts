import { Product } from "./product";
import { Recipe } from "./recipe";

// products[i] ma wagę weights[i]
export interface RecipeWithProductsResponse {
    recipe: Recipe;
    products: Product[];
    weights: number[];
}
