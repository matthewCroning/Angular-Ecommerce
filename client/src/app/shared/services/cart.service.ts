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
        console.log("created cart");
      });   
    } else {
      this.cartId = localStorage.getItem('cartId');
      this.http.get('/api/cart/getCart/' + this.cartId).subscribe((cart: any) =>{
        this.cart = cart;
        var items: any[] = [];
        Object.entries(cart.cartItems).map(item => items.push({id: item[0], amount: item[1] }));
        
        this.ProductService.findProductsByIds(Object.keys(this.cart.cartItems)).subscribe((data: any) => {
          console.log(data.length);
          console.log(data);
          for(var i = 0; i < items.length; i++){
            for(var j = 0; j < data.length; j++){
              if(items[i].id === data[j]._id){
                console.log("here");
                items[i].product = data[j];
              }
            }
          }
          cart.cartItems = items;
          this.ready = true;
          console.log(items);
          console.log(cart);
        })
      
 
      })
    }
  }

  addToCart(productId: any, amount: any){
    console.log("running add to cart")
    this.http.post('/api/cart/addProductToCart', {cartId: this.cartId, productId: productId, amount: amount}).subscribe((data: any) =>{
      for(var i = 0; i < this.cart.cartItems.length; i++){
        console.log("inside subsriber add to cart");
        console.log(this.cart.cartItems[i].id, productId);
        if(this.cart.cartItems[i].id === productId){
          console.log("true");
          console.log(this.cart.cartItems[i]);
          this.cart.cartItems[i].amount = data.amount;
        }
      }
      console.log(this.cart);
    })

  }

  
  removeFromCart(productId: any, amount: any){
    this.http.post('/api/cart/removeProductFromCart', {cartId: this.cartId, productId: productId, amount: amount}).subscribe((data: any) =>{
      for(var i = 0; i < this.cart.cartItems.length; i++){
        if(this.cart.cartItems[i].id == productId)
          this.cart.cartItems[i].amount = data.amount;
      }
    })
  }

  getCartItemsAmount(){
    var amount = 0;
    for (let item of this.cart.cartItems) {
      amount = item.amount + amount;
    }

    return amount;
  }

  getCart(){
    return this.cart;
  }

  getReady(){
    return this.ready;
  }
}
