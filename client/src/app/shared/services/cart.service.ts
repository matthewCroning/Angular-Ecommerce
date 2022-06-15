import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new Map<string, number>();
  
  constructor() { }

  addToCart(id: any){
    if(this.cart.has(id)){
      this.cart.set(id, this.cart.get(id)! + 1);
    } else {
      this.cart.set(id, 1);
    }
  }

  getCartItemsAmount(){
    var amount = 0;
    this.cart.forEach((value: number, key: string) => {
      amount =+ value;
    });
    return amount;
  }

  getCartMap(){
    return this.cart;
  }



}
