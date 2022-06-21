import { CartService } from './../../shared/services/cart.service';
import { UserDetailsService } from './../../shared/services/user-details.service';
import { Component, OnInit } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutUpOnLeaveAnimation, slideInLeftOnEnterAnimation, slideInRightOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({anchor: 'enterSlideRight', delay: 50 , duration: 500, translate: '100px'}),
    slideInLeftOnEnterAnimation({anchor: 'enterSlideLeft', delay: 50 , duration: 500, translate: '100px'}),
    fadeInDownOnEnterAnimation({ anchor: 'enterDown', delay: 50 , duration: 259, translate: '10px'}),
    fadeOutUpOnLeaveAnimation({ anchor: 'exitUp', duration: 50, translate: '10px'})
  ]
})
export class CartPaymentComponent implements OnInit {


  public paymentMethod: any;
  public billingAddress: boolean = false;

  constructor(public UserDetailsService: UserDetailsService, public CartService: CartService) { }

  ngOnInit(): void {
  }

  changePaymentMethod(paymentMethod: any){
    this.paymentMethod = paymentMethod;
  }

  changeBillingAddress(billingAddress: boolean){
    this.billingAddress = billingAddress;
  }

}
