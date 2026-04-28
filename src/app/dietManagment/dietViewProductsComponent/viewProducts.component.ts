
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppService } from '../../AAMain/appService';
import { ProductService } from '../services/productService';

@Component({
  selector: 'app-view-products',
  // imports: [RouterLink],
  templateUrl: './viewProducts.component.html',
  styleUrls: ['./viewProducts.component.css']
})
export class ViewProductsComponent {

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
    this.productService.deleteProductByUser(idOfEntry).subscribe((response) => {
          this.productService.getProductsByUser();
          this.cdr.detectChanges();
    });
  }

}