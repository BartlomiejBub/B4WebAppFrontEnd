import { Component, computed, signal } from '@angular/core';
import { AppService } from '../../AAMain/appService';
import { Product } from '../services/product';
import { ProductService } from '../services/productService';
import { RecipeService } from '../services/recipeService';
import { ToastService } from '../../AAMain/toastService';
import { T } from '../../i18n/language';

@Component({
  selector: 'app-add-product',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent {
  public isAddProductModalOpen = signal<boolean>(false);
  public t = T;

  // Items are automaticly searched during entering something to input 
  private searchTerm = signal<string>('');
  public recipesSearched = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.recipeService.recipes().filter((recipe) =>
      (recipe.name ?? '').toLowerCase().includes(term) ||
      (recipe.header ?? '').toLowerCase().includes(term)
    );
  });

  constructor(private toast: ToastService, public recipeService: RecipeService, public productService: ProductService, public appService: AppService) {
  }

  ngOnInit() {
    this.appService.updateDateView();
    this.productService.getProductsByUser();
    this.productService.getProducts();
    this.recipeService.getRecipes();
  }

  // functions that are routing to a query for database on search 
  public onSearch(searchInput: string){
    this.onSearchProducts(searchInput);
    this.searchTerm.set(searchInput);
  }

  public onSearchProducts(searchInput: string){
    const term = searchInput.toLowerCase();
    if (!term) {
      this.productService.productsSearched.set(this.productService.products());
      return;
    }
    this.productService.productsSearched.set(this.productService.products().filter((product) =>
      (product.name ?? '').toLowerCase().includes(term) ||
      (product.code ?? '').toLowerCase().includes(term)
    ));
  }

  // adding new product function that does it the same way as all other functions - routing to service then service to database
  public onAddProductRaw(name: string, caloric: string, protein: string, carbs: string, fat: string, grams: string, code: string): void {

    if (!name.trim()) {
      this.toast.error(T.addProduct.nameRequired);
      return;
    }

    const newProduct: Product = {
      ID_Product: null,
      name: name,
      caloric: Number(caloric) || 0,
      protein: Number(protein) || 0,
      fat: Number(fat) || 0,
      carbs: Number(carbs) || 0,
      gramsInOne: Number(grams) || 0,
      code: code,
      userID: Number(localStorage.getItem('userID'))
    };

    this.productService.addProduct(newProduct, Number(localStorage.getItem('userID'))).subscribe({
      next: () => {
        this.productService.getProducts();
        this.addProductModalClose();
        this.toast.success(T.addProduct.productSaved);
      },
      error: (error) => {
        console.error("Błąd podczas dodawania produktu:", error);
        this.toast.error(T.addProduct.productSaveError);
      }
    });

  }


  // And also adding product do diary for specific user
  public onAddProductByUser(idProduct: number | null | undefined, weight: string): void {
    if (idProduct === null || idProduct === undefined || weight.trim() === "" || Number(weight) <= 0) {
      this.toast.error(T.common.invalidWeight);
      return;
    }
    this.productService.addProductByUser({ date: this.appService.currentDateString(), userID: Number(localStorage.getItem('userID')), productID: idProduct, weight: Number(weight), time: this.appService.selectedTimeOfDay() }).subscribe({
      next: () => {
        this.productService.getProductsByUser();
        this.toast.success(T.addProduct.addedToEaten);
      },
      error: () => this.toast.error(T.addProduct.addToEatenError)
    });
  }

  public onAddRecipeByUser(idRecipe: number | null | undefined, weight: string): void {
    if (idRecipe === null || idRecipe === undefined || weight.trim() === "" || Number(weight) <= 0) {
      this.toast.error(T.common.invalidWeight);
      return;
    }
    this.recipeService.addRecipeByUser({ date: this.appService.currentDateString(), userID: Number(localStorage.getItem('userID')), productID: idRecipe, weight: Number(weight), time: this.appService.selectedTimeOfDay() }).subscribe({
      next: () => {
        this.productService.getProductsByUser();
        this.toast.success(T.addProduct.recipeAddedToEaten);
      },
      error: () => this.toast.error(T.addProduct.recipeAddToEatenError)
    });
  }

  public addProductModalOpen(){
    this.isAddProductModalOpen.set(true);
  }

  public addProductModalClose(){
    this.isAddProductModalOpen.set(false);
  }

}
