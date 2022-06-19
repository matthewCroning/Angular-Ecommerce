import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartDeliveryInformationComponent } from './cart-delivery-information/cart-delivery-information.component';
import { CartShippingComponent } from './cart-shipping/cart-shipping.component';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CartComponent,
    CartDeliveryInformationComponent,
    CartShippingComponent,
    CartPaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
