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

  reduceStock(id: any){
    return this.http.get('/api/product/reduceStock/' + id);     
  }

  increaseStock(id: any){
    return this.http.get('/api/product/increaseStock/' + id);     
  }
}
