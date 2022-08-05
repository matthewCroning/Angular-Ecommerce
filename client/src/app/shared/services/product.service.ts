import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCount!: any;

  constructor(private http: HttpClient) {
    this.getCount().subscribe((count: any) =>{
      this.productCount = count;
    })
   }

  findAll(){
    return this.http.get('/api/product/findall');   
  }

  find(limit: any, page: any, sort: any, order: any){
    return this.http.get('/api/product/find/' + limit + "/" + page + "/" + sort + "/" + order);  
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

  getCount(){
    return this.http.get('/api/product/getCount');     
  }

  getProductCount(){
    return this.productCount;
  }
}
