import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductByUserResponse } from './AA-ProductByUserResponse';
import { ProductByUserAddRequest } from './AA-ProductByUserAddRequest';
import { Recipe } from './recipe';
import { RecipeAddRequest } from './AA-RecipeAddRequest';
import { RecipeWithProductsResponse } from './AA-RecipeWithProductsResponse';
import { API_URL } from '../../AAMain/api';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private apiServerUrl = API_URL;
  public createdByUserRecipes = signal<Recipe[]>([]);
  public createdByUserRecipesProducts = signal<Product[][]>([]);
  public createdByUserRecipesProductsWeights = signal<number[][]>([]);
  public productsRequired = signal<Product[][]>([]);
  public weightsRequired = signal<number[][]>([]);
  public recipes = signal<Recipe[]>([]);

  constructor(private http: HttpClient) {
  }

  // specific function that uses class with recipe and used products in it, also containing weights of products
  // it`s important that it should be restored as a single object to not any data during multiple requests for 
  // recipe and products, it caused some problems earlier with seperate ones
  
  public getRecipes(): void {
    this.http.get<RecipeWithProductsResponse[]>(`${this.apiServerUrl}recipe/withProducts`).subscribe((response) => {
      const userID = Number(localStorage.getItem("userID"));
      const createdByUser = response.filter((entry) => entry.recipe.userID === userID);

      this.recipes.set(response.map((entry) => entry.recipe));
      this.productsRequired.set(response.map((entry) => entry.products));
      this.weightsRequired.set(response.map((entry) => entry.weights));

      this.createdByUserRecipes.set(createdByUser.map((entry) => entry.recipe));
      this.createdByUserRecipesProducts.set(createdByUser.map((entry) => entry.products));
      this.createdByUserRecipesProductsWeights.set(createdByUser.map((entry) => entry.weights));
    });
  }

  public addRecipeByUser(request:  ProductByUserAddRequest): Observable<ProductByUserResponse>{
    return this.http.post<any>(`${this.apiServerUrl}` + `recipesByUser/add`, request);
  }

  public addRecipe(recipe: Recipe, userID: number, productList: number[], weights: number[]): Observable<Recipe>{
    const recipeAddRequest: RecipeAddRequest = {
      recipe: recipe,
      productIDs: productList,
      weights: weights
    }

    return this.http.post<any>(`${this.apiServerUrl}` + `recipe/${userID}`, recipeAddRequest);
  }

  public deleteRecipe(recipeID: number): Observable<void>{
    return this.http.delete<any>(`${this.apiServerUrl}recipe/${recipeID}`);
  }

  public deleteRecipeByUser(idOfEntry: number): Observable<void>{
    return this.http.delete<any>(`${this.apiServerUrl}recipesByUser/${idOfEntry}`);
  }

}
