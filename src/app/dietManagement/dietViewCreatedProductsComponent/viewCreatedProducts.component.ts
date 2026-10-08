
import { Component, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../AAMain/appService';
import { ProductService } from '../services/productService';
import { RecipeService } from '../services/recipeService';
import { Recipe } from '../services/recipe';
import { MEAL_TIMES } from '../services/mealTimes';
import { recipePlaceholder } from '../services/recipePlaceholder';
import { ToastService } from '../../AAMain/toastService';
import { T } from '../../i18n/language';

// This is a component that shows user products and recipes that was earlier created by him, with a possibility to delete them
// or add them to consumed ones - it really helps because user will be propably use them more ofen becuase he added them,
// and he will not need to search them by hand in other component
// all is added / deleted from specific table with ID of user connected to recipe / product

@Component({
  selector: 'app-view-created-products',
  templateUrl: './viewCreatedProducts.component.html',
  styleUrls: ['./viewCreatedProducts.component.css']
})
export class ViewCreatedProductsComponent {

  public selectedRecipeIndex = signal<number | null>(null);
  public detailsMessage = signal<string>("");
  public mealTimes = MEAL_TIMES;
  public placeholder = recipePlaceholder;
  public t = T;

  constructor(private toast: ToastService, public recipeService: RecipeService, public productService: ProductService, public appService: AppService) {
  }

  ngOnInit() {
    this.appService.updateDateView();
    this.productService.getProducts();
    this.productService.getProductsByUser();
    this.recipeService.getRecipes();
  }

  public deleteEntry(idOfEntry: number){
    if (!confirm(T.created.confirmDeleteProduct)) return;
    this.productService.deleteProduct(idOfEntry).subscribe({
      next: () => this.productService.getProducts(),
      error: (error: HttpErrorResponse) => this.toast.error(error.error?.message ?? T.created.deleteProductError)
    });
  }

  public deleteEntryRecipe(idOfEntry: number){
    if (!confirm(T.created.confirmDeleteRecipe)) return;
    this.recipeService.deleteRecipe(idOfEntry).subscribe({
      next: () => this.recipeService.getRecipes(),
      error: (error: HttpErrorResponse) => this.toast.error(error.error?.message ?? T.created.deleteRecipeError)
    });
  }

  public openRecipeDetailsModal(index: number): void {
    this.selectedRecipeIndex.set(index);
    this.detailsMessage.set("");
  }

  public closeRecipeDetailsModal(): void {
    this.selectedRecipeIndex.set(null);
  }

  public onAddRecipeToConsumed(recipe: Recipe, weight: string, time: string): void {
    if (recipe.ID_Recipe === null || recipe.ID_Recipe === undefined || weight.trim() === "" || Number(weight) <= 0) {
      this.toast.error(T.common.invalidWeight);
      return;
    }
    this.recipeService.addRecipeByUser({ date: this.appService.currentDateString(), userID: Number(localStorage.getItem('userID')), productID: recipe.ID_Recipe, weight: Number(weight), time: Number(time) }).subscribe({
      next: () => {
        this.productService.getProductsByUser();
        this.detailsMessage.set(T.recipe.addedToEaten(this.appService.currentDateString()));
      },
      error: (error) => {
        console.error("Błąd podczas dodawania przepisu do zjedzonych:", error);
        this.toast.error(T.recipe.addToEatenError);
      }
    });
  }

}
