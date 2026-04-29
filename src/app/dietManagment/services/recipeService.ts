import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { User } from '../../usersManagment/user-service/user';
import { ProductByUserResponse } from './AA-ProductByUserResponse';
import { ProductByUserAddRequest } from './AA-ProductByUserAddRequest';
import { AppService } from '../../AAMain/appService';
import { Recipe } from './recipe';
import { RecipeAddRequest } from './AA-RecipeAddRequest';
import { ProductService } from './productService';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private apiServerUrl = 'http://localhost:8080/api/v1/'
  public productsRequired = signal<Product[][]>([[]]);
  public weightsRequired = signal<number[][]>([[]]);
  public recipes = signal<Recipe[]>([]);

  constructor(private http: HttpClient, public appService: AppService) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  public getRecipes(): void {
    this.http.get<any>(`${this.apiServerUrl}recipe`).subscribe((response) => {
      this.recipes.set(response);

      for (let i = 0; i < this.recipes().length; i++) {

        const recipe = this.recipes()[i];

        this.http.get<any>(`${this.apiServerUrl}recipe/getProductsFromRecipe/${recipe.ID_Recipe}`).subscribe((response) => {
            this.productsRequired.update((currentProducts) => {
              const updatedProducts = [...currentProducts];
              updatedProducts[i] = response;
              return updatedProducts;
            });
        });

        this.http.get<any>(`${this.apiServerUrl}recipe/getProductsWeightsFromRecipe/${recipe.ID_Recipe}`).subscribe((response) => {
          this.weightsRequired.update((currentWeights) => {
            const updatedWeights = [...currentWeights];
            updatedWeights[i] = response;
            return updatedWeights;
          });
        });

      }
      
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
