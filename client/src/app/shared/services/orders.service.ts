import { CartService } from './cart.service';
import { UserDetailsService } from './user-details.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
 

  constructor(private http: HttpClient, private CartService: CartService, private UserDetailsService: UserDetailsService) { }

  findAll(status: any){
    return this.http.get('/api/order/findAll/' + status);
  }

  submitOrder(){
    var userInfo = this.UserDetailsService.getUserInformation();
    this.http.post('/api/order/create', {cartId : this.CartService.getCartId(),
    deliveryAddress: this.UserDetailsService.getDeliveryString(),
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    deliveryType: userInfo.deliveryType,
    payment: userInfo.payment
  }).subscribe(() => {
    console.log("completed order");
  })  
  }
}
