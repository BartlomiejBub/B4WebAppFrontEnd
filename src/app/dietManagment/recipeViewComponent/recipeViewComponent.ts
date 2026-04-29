
import { Component, effect, signal, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppService } from '../../AAMain/appService';
import { ProductService } from '../services/productService';
import { RecipeService } from '../services/recipeService';
import { Recipe } from '../services/recipe';
import { Product } from '../services/product';

@Component({
  selector: 'app-view-products',
  // imports: [RouterLink],
  templateUrl: './recipeViewComponent.html',
  styleUrls: ['./recipeViewComponent.css']
})
export class RecipeViewComponent {

  public isAddRecipeModalOpen: boolean = false;
  public isAddProductsToRecipeModalOpen: boolean = false;


  constructor(public productService: ProductService, private cdr: ChangeDetectorRef, public recipeService: RecipeService, public appService: AppService) {
    this.recipeService = recipeService;
    this.cdr = cdr;
    this.appService = appService;
    this.productService = productService;

    effect(() => {
      this.onSearchrecipes(''); 
    });
  }

  public selectedRecipeProducts: number[] = [];
  public weights: number[] = [];
  public searchedRecipes = signal<Recipe[]>([]);
  public searchedRecipesProducts = signal<Product[][]>([[]]);
  public searchedRecipesProductsWeights = signal<number[][]>([[]]);

   public newRecipe: Recipe = {
      ID_Recipe: null,
      name: "",
      header: "header",
      description: "description",
      timeToCook: Number(0) || 0,
      portion: Number(0) || 1,
      gramsInOne: Number(0) || 0,
      caloric: Number(0) || 0,
      protein: Number(0) || 0,
      carbs: Number(0) || 0,
      fat: Number(0) || 0,
      userID: Number(localStorage.getItem('userID'))
    };
  
  ngOnInit() {
    this.appService.updateDateView();
    this.recipeService.getRecipes();
    this.searchedRecipes.set(this.recipeService.recipes());
    this.searchedRecipesProducts.set(this.recipeService.productsRequired());
    this.searchedRecipesProductsWeights.set(this.recipeService.weightsRequired());
    this.cdr.detectChanges();
  }

 public openAddRecipeModal(): void {
    this.isAddRecipeModalOpen = true;
  }

  public closeAddRecipeModal(): void {
    this.isAddRecipeModalOpen = false;
  }

  public deleteRecipe(idOfEntry: number){
    this.recipeService.deleteRecipe(idOfEntry).subscribe((response) => {
          this.recipeService.getRecipes();
          this.cdr.detectChanges();
    });
  }

  public onSearchrecipes(searchInput: String){
    const results: Recipe[] = [];
    let i = 0;
    let newI = 0;
    for (const recipe of this.recipeService.recipes()) {
      if (recipe.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchInput.toLowerCase()) ||
          recipe.header.toLowerCase().includes(searchInput.toLowerCase())
        ) {

        this.searchedRecipesProducts.update((currentProducts) => {
          const updatedProducts = [...currentProducts];
          updatedProducts[newI] = this.recipeService.productsRequired()[i];
          return updatedProducts;
        });

        this.searchedRecipesProductsWeights.update((currentProducts) => {
          const updatedWeights = [...currentProducts];
          updatedWeights[newI] = this.recipeService.weightsRequired()[i];
          return updatedWeights;
        });

        results.push(recipe);
        newI++;
      }
      i++;
    }
    this.searchedRecipes.set(results);
    if (!searchInput) {
      this.searchedRecipes.set(this.recipeService.recipes());
      this.searchedRecipesProducts.set(this.recipeService.productsRequired());
      this.searchedRecipesProductsWeights.set(this.recipeService.weightsRequired());
    }
    this.cdr.detectChanges();
  }

  public onAddRecipeSubmit(): void {
    this.recipeService.addRecipe(this.newRecipe, Number(localStorage.getItem('userID')), this.selectedRecipeProducts, this.weights).subscribe(
      (responce) => {
        this.recipeService.getRecipes();
        this.closeAddRecipeModal();
        this.closeAddProductsToRecipeModal();
        this.selectedRecipeProducts = []; 
        this.weights = [];
        this.cdr.detectChanges();
      },
      (error) => {
        console.error("Błąd podczas dodawania przepisu:", error);
        alert("Wystąpił błąd przy dodawaniu przepisu.");
      }
    );
  }

  public moveOnToAddProductsToRecipe(
    name: string, header: string, description: string,
    time: string, portion: string, grams: string,
    kcal: string, protein: string, carbs: string, fat: string) : void{

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
    this.cdr.detectChanges();

  }

  public onSearchProducts(searchInput: String){
      const results: Product[] = [];
      for (const product of this.productService.products()) {
        if (product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            product.code.toLowerCase().includes(searchInput.toLowerCase())) {
          results.push(product);
        }
      }
      this.productService.productsSearched.set(results);
      if (!searchInput) {
        this.productService.productsSearched.set(this.productService.products());
      }
    this.cdr.detectChanges();
  }

  onAddProductToRecipe(idProduct: number | null | undefined, weight: string): void {
    if (idProduct === null || idProduct === undefined || weight.trim() === "" || Number(weight) <= 0) {
      alert("Wybierz produkt i podaj poprawną wagę!");
      return;
    } else {
      this.selectedRecipeProducts.push(idProduct);
      this.weights.push(Number(weight));
      this.cdr.detectChanges();
    } 
  }
     

  public openAddProductsToRecipeModal(): void { 
    this.isAddProductsToRecipeModalOpen = true;
  }

  public closeAddProductsToRecipeModal(): void {
    this.isAddProductsToRecipeModalOpen = false;
  }

  public backToRecipeDetails(): void {
    this.closeAddProductsToRecipeModal();
    this.openAddRecipeModal();
    this.cdr.detectChanges();
  }

}