import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createProduct(product: any, productVariation: any){
    return this.http.post('/api/product/create', {product: product, productVariation: productVariation}); 
  }

  createProductVariation(productVariation: any, productId: any){
    return this.http.post('/api/productVariation/create/' + productId, {productVariation: productVariation}); 
  }

  editProduct(product: any, productId: any){
    return this.http.post('/api/product/edit/' + productId, {product: product}); 
  }

}
