import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createProduct(product: any){
    return this.http.post('/api/product/create', {product: product}); 
  }

  createProductVariation(productVariation: any, productId: any){
    return this.http.post('/api/productVariation/create/' + productId, {productVariation: productVariation}); 
  }

}
