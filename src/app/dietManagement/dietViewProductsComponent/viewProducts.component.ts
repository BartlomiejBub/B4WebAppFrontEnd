
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../../AAMain/appService';
import { ProductService } from '../services/productService';
import { RecipeService } from '../services/recipeService';
import { ProductByUserResponse } from '../services/AA-ProductByUserResponse';
import { MEAL_TIMES } from '../services/mealTimes';
import { ToastService } from '../../AAMain/toastService';
import { T } from '../../i18n/language';

// Component that let user see added products and also leave a possibilty to add new ones routing to another component
// All macros ale calculated real time reacting on change 


@Component({
  selector: 'app-view-products',
  templateUrl: './viewProducts.component.html',
  styleUrls: ['./viewProducts.component.css'],
  imports: [RouterLink]
})
export class ViewProductsComponent {

  public mealTimes = MEAL_TIMES;
  public t = T;

  constructor(private toast: ToastService, private recipeService: RecipeService, public productService: ProductService, public appService: AppService) {
  }

  ngOnInit() {
    this.appService.updateDateView();
    this.productService.getProducts();
    this.productService.getProductsByUser();
  }

  // Wpisy bez pory posiłku (0 / brak) pokazujemy przy śniadaniu
  public entriesForMeal(entries: ProductByUserResponse[], time: number): ProductByUserResponse[] {
    return entries.filter((entry) => entry.time === time || (time === 1 && !entry.time));
  }

  public isMealEmpty(time: number): boolean {
    return this.entriesForMeal(this.productService.consumedProducts(), time).length === 0 &&
      this.entriesForMeal(this.productService.consumedRecipes(), time).length === 0;
  }

  // Suma kalorii w danym posiłku (produkty + przepisy)
  public mealKcal(time: number): number {
    const entries = [
      ...this.entriesForMeal(this.productService.consumedProducts(), time),
      ...this.entriesForMeal(this.productService.consumedRecipes(), time)
    ];
    const sum = entries.reduce((total, entry) => total + entry.caloriesCalculated, 0);
    return Math.round(sum * 10) / 10;
  }

  public deleteEntry(idOfEntry: number){
    this.productService.deleteProductByUser(idOfEntry).subscribe({
      next: () => this.productService.getProductsByUser(),
      error: () => this.toast.error(T.eaten.deleteError)
    });
  }

  public deleteEntryFromRecipe(idOfEntry: number){
    this.recipeService.deleteRecipeByUser(idOfEntry).subscribe({
      next: () => this.productService.getProductsByUser(),
      error: () => this.toast.error(T.eaten.deleteError)
    });
  }

  changeTimeOfDay(timeOfDay: number){
    this.appService.selectedTimeOfDay.set(timeOfDay);
  }

}
