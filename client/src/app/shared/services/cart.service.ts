import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new Map<string, any>();
  
  constructor() { }

  addToCart(id: any, item: any){
    if(this.cart.has(id)){
      this.cart.set(id, {amount: this.cart.get(id).amount! + 1, item: item});
    } else {
      this.cart.set(id, {amount: 1, item: item});
    }
  }

  getCartItemsAmount(){
    var amount = 0;
    this.cart.forEach((value: any, key: string) => {
      amount =+ value.amount;
    });
    return amount;
  }

  getCartTotalPrice(){
    var totalPrice = 0;
    this.cart.forEach((value: any, key: string) => {
      totalPrice =+ (value.amount * value.item.price);
    });
    return totalPrice;
  }

  getCartMap(){
    return this.cart;
  }



}
