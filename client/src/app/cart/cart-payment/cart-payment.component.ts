import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {


  public paymentMethod: any;
  public billingAddress: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changePaymentMethod(paymentMethod: any){
    this.paymentMethod = paymentMethod;
  }

  changeBillingAddress(billingAddress: boolean){
    this.billingAddress = billingAddress;
  }

}
