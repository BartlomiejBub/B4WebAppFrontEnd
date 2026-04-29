
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppService } from '../../AAMain/appService';
import { ProductService } from '../services/productService';
import { RecipeService } from '../services/recipeService';

@Component({
  selector: 'app-view-products',
  // imports: [RouterLink],
  templateUrl: './viewProducts.component.html',
  styleUrls: ['./viewProducts.component.css'],
  imports: [RouterLink]
})
export class ViewProductsComponent {

  constructor(private recipeService: RecipeService, private cdr: ChangeDetectorRef, public productService: ProductService, public appService: AppService) {
    this.productService = productService;
    this.cdr = cdr;
    this.appService = appService;
    this.recipeService = recipeService;
  }
  
  ngOnInit() {
    this.appService.updateDateView();
    this.productService.getProducts();
    this.productService.getProductsByUser();
    this.cdr.detectChanges();
  }

  public deleteEntry(idOfEntry: number){
    this.productService.deleteProductByUser(idOfEntry).subscribe((response) => {
          this.productService.getProductsByUser();
          this.cdr.detectChanges();
    });
  }

  public deleteEntryFromRecipe(idOfEntry: number){
    this.recipeService.deleteRecipeByUser(idOfEntry).subscribe((response) => {
          this.productService.getProductsByUser();
          this.cdr.detectChanges();
    });
  }

  changeTimeOfDay(timeOfDay: number){
    this.appService.selectedTimeOfDay.set(timeOfDay);
  }

}