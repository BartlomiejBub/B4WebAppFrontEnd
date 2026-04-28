import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../AAMain/appService';
import { Product } from '../services/product';
import { ProductService } from '../services/productService';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-add-product',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent {
  public selectedProduct: Product | null = null;
  public isAddProductModalOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef, public productService: ProductService, public appService: AppService) {
    this.productService = productService;
    this.cdr = cdr;
    this.appService = appService;
  }
  
  ngOnInit() {
    this.appService.updateDateView();
    this.productService.getProductsByUser();
    this.productService.getProducts();
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

  public onAddProductRaw(name: string, caloric: string, protein: string, carbs: string, fat: string, grams: string, code: string): void {
  
    if (!name.trim()) {
      alert("Podaj nazwę produktu!");
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

    this.productService.addProduct(newProduct, Number(localStorage.getItem('userID'))).subscribe(
      (response: any) => {
        this.productService.getProducts();
        this.addProductModalClose();
        this.cdr.detectChanges();
      }
    );
   
  }

  public onAddProductByUser(idProduct: number | null | undefined, weight: string): void {
    if (idProduct === null || idProduct === undefined || weight.trim() === "" || Number(weight) <= 0) {
      alert("Proszę wypełnić wagę poprawnie!");
    } else {
      this.productService.addProductByUser({ date: this.appService.currentDateString(), userID: Number(localStorage.getItem('userID')), productID: idProduct, weight: Number(weight) }).subscribe(
        (response) => {
          this.productService.getProductsByUser();
          this.cdr.detectChanges();
        }
      );
  }
  }

  public addProductModalOpen(){
    this.isAddProductModalOpen = true;
  }

  public addProductModalClose(){
    this.isAddProductModalOpen = false;
  }

}