import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartId!: any;
  cart!: any;

  constructor(public ProductService: ProductService, private http: HttpClient) { 
    if(localStorage.getItem('cartId') === null){
      this.http.get('/api/cart/createCart').subscribe((cartId: any) =>{
        this.cartId = cartId;
        localStorage.setItem('cartId', this.cartId); 
        console.log("created cart");
      });   
    } else {
      this.cartId = localStorage.getItem('cartId');
      this.http.get('/api/cart/getCart/' + this.cartId).subscribe((cart: any) =>{
        this.cart = cart;
        console.log(cart);
      })
    }
  }

  addToCart(productId: any, amount: any){
    this.http.post('/api/cart/addProductToCart', {cartId: this.cartId, productId: productId, amount: amount}).subscribe((cart: any) =>{
      this.cart = cart;
      console.log(cart);
    })
  }

  
  removeFromCart(productId: any, amount: any){
    this.http.post('/api/cart/removeProductFromCart', {cartId: this.cartId, productId: productId, amount: amount}).subscribe((cart: any) =>{
      this.cart = cart;
      console.log(cart);
    })
  }

  getCartItemsAmount(){
    return 0;
  }

  getCart(){
    return this.cart;
  }

}
