import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { computeDestinationPoint } from 'geolib';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  addToCart(productId: any, amount: any){
    console.log("running add to cart")
    this.http.post('/api/cart/addProductToCart', {cartId: this.cartId, productId: productId, amount: amount}).subscribe((data: any) =>{
      this.cart.cartItems[data.cartItem.product._id] = data.cartItem;
    })
      

  }

  
  removeFromCart(productId: any, amount: any){
    this.http.post('/api/cart/removeProductFromCart', {cartId: this.cartId, productId: productId, amount: amount}).subscribe((data: any) =>{
      if(data.cartItem.amount === 0){
          delete this.cart.cartItems[productId];
        } else {
          this.cart.cartItems[data.cartItem.product._id] = data.cartItem;
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
      total = (this.cart.cartItems[item].amount*this.cart.cartItems[item].product.price) + total;
    }
    return total;
  }
  getCart(){
    return this.cart;
  }


}
