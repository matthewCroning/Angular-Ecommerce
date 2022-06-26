import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get('/api/product/findall');   
  }

  findProductById(id: any){
    return this.http.get('/api/product/findProductById/' + id);     
  }

  findProductsByIds(ids: any[]){
    return this.http.post('/api/product/findProductsByIds', {productIds: ids});       
  }

  reduceStock(id: any){
    return this.http.get('/api/product/reduceStock/' + id);     
  }

  increaseStock(id: any){
    return this.http.get('/api/product/increaseStock/' + id);     
  }
}
