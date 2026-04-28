import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { User } from '../../usersManagment/user-service/user';
import { ProductByUserResponse } from './AA-ProductByUserResponse';
import { ProductByUserAddRequest } from './AA-ProductByUserAddRequest';
import { AppService } from '../../AAMain/appService';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiServerUrl = 'http://localhost:8080/api/v1/'
  public products = signal<Product[]>([]);
  public consumedProducts = signal<ProductByUserResponse[]>([]);
  public createdByUserProducts = signal<Product[]>([]);
  public productsSearched = signal<Product[]>([]);

  constructor(private http: HttpClient, public appService: AppService) {

  }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.http.get<any>(`${this.apiServerUrl}product`).subscribe((response) => {
      this.products.set(response);
      this.productsSearched.set(response);
      this.createdByUserProducts.set(this.products().filter((product) => product.userID === Number(localStorage.getItem("userID"))));
    });
  }

  public addProduct(product: Product, userID: number): Observable<Product>{
    return this.http.post<any>(`${this.apiServerUrl}` + `product/${userID}`, product);
  }

  public deleteProduct(productId: number): Observable<void>{
    return this.http.delete<any>(`${this.apiServerUrl}product/${productId}`);
  }

  public deleteProductByUser(idOfEntry: number): Observable<void>{
    return this.http.delete<any>(`${this.apiServerUrl}productsByUser/${idOfEntry}`);
  }
  
  public getProductsByUser(): void {
    this.http.get<any>(`${this.apiServerUrl}` + `productsByUser/${localStorage.getItem("userID")}/${this.appService.currentDateString()}`).subscribe((response) => {
      this.consumedProducts.set(response);
      this.calculateMacrosForDay();
    });
  }

  public addProductByUser(request:  ProductByUserAddRequest): Observable<ProductByUserResponse>{
    return this.http.post<any>(`${this.apiServerUrl}` + `productsByUser/add`, request);
  }

  public calculateMacrosForDay(){
    let kcal = 0;
    let carbs = 0;
    let proteins = 0;
    let fats = 0;
    for(const entry of this.consumedProducts()){
      kcal += entry.caloriesCalculated;
      carbs += entry.carbsCalculated;
      proteins += entry.proteinCalculated;
      fats += entry.fatCalculated;
    }
    this.appService.setCurrentKcalStats(kcal, carbs, proteins, fats);
  }
}
