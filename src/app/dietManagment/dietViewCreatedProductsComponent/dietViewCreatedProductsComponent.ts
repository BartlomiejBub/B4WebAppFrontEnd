
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppService } from '../../AAMain/appService';
import { Product } from '../services/product';
import { ProductService } from '../services/productService';

@Component({
  selector: 'app-view-created-products',
  // imports: [RouterLink],
  templateUrl: './dietViewCreatedProductsComponent.html',
  styleUrls: ['./dietViewCreatedProductsComponent.css']
})
export class ViewCreatedProductsComponent {

  constructor(private cdr: ChangeDetectorRef, public productService: ProductService, public appService: AppService) {
    this.productService = productService;
    this.cdr = cdr;
    this.appService = appService;
  }
  
  ngOnInit() {
    this.appService.updateDateView();
    this.productService.getProducts();
    this.productService.getProductsByUser();
    this.cdr.detectChanges();
  }

  public deleteEntry(idOfEntry: number){
    this.productService.deleteProduct(idOfEntry).subscribe((response) => {
          this.productService.getProducts();
          this.cdr.detectChanges();
    });
  }

}