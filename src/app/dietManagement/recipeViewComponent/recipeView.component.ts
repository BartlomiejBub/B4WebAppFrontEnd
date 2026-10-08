
import { Component, computed, signal } from '@angular/core';
import { AppService } from '../../AAMain/appService';
import { ProductService } from '../services/productService';
import { RecipeService } from '../services/recipeService';
import { Recipe } from '../services/recipe';
import { Product } from '../services/product';
import { MEAL_TIMES } from '../services/mealTimes';
import { recipePlaceholder } from '../services/recipePlaceholder';
import { ToastService } from '../../AAMain/toastService';
import { T } from '../../i18n/language';

// Its a component that shows all recipes that are in database with possibility to check their description on click and
// add a new one

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipeView.component.html',
  styleUrls: ['./recipeView.component.css']
})
export class RecipeViewComponent {

  public isAddRecipeModalOpen = signal<boolean>(false);
  public isAddProductsToRecipeModalOpen = signal<boolean>(false);
  public t = T;

  constructor(private toast: ToastService, public productService: ProductService, public recipeService: RecipeService, public appService: AppService) {
  }

  public selectedRecipeProducts: number[] = [];
  public weights: number[] = [];
  public newRecipe: Recipe = this.emptyRecipe();

  private searchTerm = signal<string>('');
  private matchingIndexes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const indexes: number[] = [];
    this.recipeService.recipes().forEach((recipe, i) => {
      if ((recipe.name ?? '').toLowerCase().includes(term) ||
          (recipe.description ?? '').toLowerCase().includes(term) ||
          (recipe.header ?? '').toLowerCase().includes(term)) {
        indexes.push(i);
      }
    });
    return indexes;
  });
  public searchedRecipes = computed(() => this.matchingIndexes().map((i) => this.recipeService.recipes()[i]));
  public searchedRecipesProducts = computed(() => this.matchingIndexes().map((i) => this.recipeService.productsRequired()[i] ?? []));
  public searchedRecipesProductsWeights = computed(() => this.matchingIndexes().map((i) => this.recipeService.weightsRequired()[i] ?? []));

  ngOnInit() {
    this.appService.updateDateView();
    this.recipeService.getRecipes();
  }

  private emptyRecipe(): Recipe {
    return {
      ID_Recipe: null,
      name: "",
      header: "",
      description: "",
      timeToCook: 0,
      portion: 1,
      gramsInOne: 0,
      caloric: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      userID: Number(localStorage.getItem('userID'))
    };
  }

  public openAddRecipeModal(): void {
    this.isAddRecipeModalOpen.set(true);
  }

  public closeAddRecipeModal(): void {
    this.isAddRecipeModalOpen.set(false);
  }

  public onSearchrecipes(searchInput: string){
    this.searchTerm.set(searchInput);
  }

  public onAddRecipeSubmit(): void {
    this.recipeService.addRecipe(this.newRecipe, Number(localStorage.getItem('userID')), this.selectedRecipeProducts, this.weights).subscribe({
      next: () => {
        this.recipeService.getRecipes();
        this.selectedRecipeProducts = [];
        this.weights = [];
        this.newRecipe = this.emptyRecipe();
        this.closeAddRecipeModal();
        this.closeAddProductsToRecipeModal();
      },
      error: (error) => {
        console.error("Błąd podczas dodawania przepisu:", error);
        this.toast.error(T.recipes.saveError);
      }
    });
  }

  public moveOnToAddProductsToRecipe(
    name: string, header: string, description: string,
    time: string, portion: string, grams: string,
    kcal: string, protein: string, carbs: string, fat: string) : void{

    if (!name.trim()) {
      this.toast.error(T.recipes.nameRequired);
      return;
    }

    this.newRecipe.name = name;
    this.newRecipe.header = header;
    this.newRecipe.description = description;
    this.newRecipe.timeToCook = Number(time) || 0;
    this.newRecipe.portion = Number(portion) || 1;
    this.newRecipe.gramsInOne = Number(grams) || 0;
    this.newRecipe.caloric = Number(kcal) || 0;
    this.newRecipe.protein = Number(protein) || 0;
    this.newRecipe.carbs = Number(carbs) || 0;
    this.newRecipe.fat = Number(fat) || 0;

    this.closeAddRecipeModal();
    this.productService.getProducts();
    this.openAddProductsToRecipeModal();
  }

  public onSearchProducts(searchInput: string){
    const term = searchInput.toLowerCase();
    if (!term) {
      this.productService.productsSearched.set(this.productService.products());
      return;
    }
    this.productService.productsSearched.set(this.productService.products().filter((product: Product) =>
      (product.name ?? '').toLowerCase().includes(term) ||
      (product.code ?? '').toLowerCase().includes(term)
    ));
  }

  onAddProductToRecipe(idProduct: number | null | undefined, weight: string): void {
    if (idProduct === null || idProduct === undefined || weight.trim() === "" || Number(weight) <= 0) {
      this.toast.error(T.recipes.invalidIngredient);
      return;
    }
    this.selectedRecipeProducts.push(idProduct);
    this.weights.push(Number(weight));
  }

  public selectedRecipeIndex = signal<number | null>(null);
  public detailsMessage = signal<string>("");
  public mealTimes = MEAL_TIMES;
  public placeholder = recipePlaceholder;

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

  public openAddProductsToRecipeModal(): void {
    this.isAddProductsToRecipeModalOpen.set(true);
  }

  public closeAddProductsToRecipeModal(): void {
    this.isAddProductsToRecipeModalOpen.set(false);
  }

  public backToRecipeDetails(): void {
    this.closeAddProductsToRecipeModal();
    this.openAddRecipeModal();
  }

}
