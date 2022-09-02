import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { computeDestinationPoint } from 'geolib';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static getCartId() {
    throw new Error('Method not implemented.');
  }

  cartId!: any;
  cart!: any;
  ready = false;

  constructor(public ProductService: ProductService, private http: HttpClient) { 
    if(localStorage.getItem('cartId') === null){
      this.http.get('/api/cart/createCart').subscribe((cartId: any) =>{
        this.cartId = cartId;
        localStorage.setItem('cartId', this.cartId); 
      });   
    } else {
      this.cartId = localStorage.getItem('cartId');
      this.http.get('/api/cart/getCart/' + this.cartId).subscribe((cart: any) =>{
        this.cart = cart;
      })
    }
  }

  addToCart(productId: String, productVariationId: any, amount: any){
    console.log("running add to cart")
    this.http.post('/api/cart/addProductToCart', {cartId: this.cartId, productId: productId, productVariationId: productVariationId, amount: amount}).subscribe((data: any) =>{
      this.cart.cartItems[data.cartItem.productVariation._id] = data.cartItem;
    })
      

  }

  
  removeFromCart(productId: String, productVariationId: any, amount: any){
    this.http.post('/api/cart/removeProductFromCart', {cartId: this.cartId, productVariationId: productVariationId, amount: amount, productId: productId}).subscribe((data: any) =>{
      if(data.cartItem.amount === 0){
          delete this.cart.cartItems[productVariationId];
        } else {
          this.cart.cartItems[data.cartItem.productVariation._id] = data.cartItem;
        }  
    })
  }

  getCartItemsAmount(){
    var amount = 0;
    if(this.cart){
      for (let item in this.cart.cartItems) {
        amount = this.cart.cartItems[item].amount + amount;
      }
    }
    return amount;
  }

  getCartTotalPrice(){
    var total = 0;
    for (let item in this.cart.cartItems) {
      total = (this.cart.cartItems[item].amount*this.cart.cartItems[item].productVariation.price) + total;
    }
    return total;
  }

  getCart(){
    return this.cart;
  }

  getCartId(){
    return this.cartId;
  }


}
