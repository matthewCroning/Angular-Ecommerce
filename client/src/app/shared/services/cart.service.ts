import { ProductService } from './product.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new Map<string, any>();
  
  constructor(public ProductService: ProductService) { 
    this.loadCart();
  }

  addToCart(id: any, item: any){

    this.ProductService.reduceStock(id).subscribe((data: any) => {
      if(data.status == "success"){
        if(this.cart.has(id)){
          this.cart.set(id, {amount: this.cart.get(id).amount! + 1, item: item});
        } else {
          this.cart.set(id, {amount: 1, item: item});
        } 
      }
    }
    )
  
    this.saveCart();
  }

  reduceFromCart(id:any){
    
    this.ProductService.increaseStock(id).subscribe((data :any) => {
      if(data.status == "success"){
        if(this.cart.get(id).amount > 1){
          this.cart.set(id, {amount: this.cart.get(id).amount! - 1, item: this.cart.get(id).item});
        } 
      }
    })

    this.saveCart();
  }

  removeFromCart(id: any){
    this.loadCart();
    this.cart.delete(id);
    this.saveCart();
  }

  getCartItemsAmount(){
    var amount = 0;
    this.cart.forEach((value: any, key: string) => {
      amount = amount + value.amount;
    });
    return amount;
  }

  getCartTotalPrice(){
    var totalPrice = 0;
    this.cart.forEach((value: any, key: string) => {
      totalPrice = totalPrice + (value.amount * value.item.price);
    });
    return totalPrice;
  }

  saveCart(){
    localStorage['cart'] = JSON.stringify(Array.from(this.cart.entries()));
  }

  loadCart(){
    if(localStorage['cart'])
      this.cart = new Map(JSON.parse(localStorage['cart']));
  }

  getCartMap(){
    return this.cart;
  }



}
