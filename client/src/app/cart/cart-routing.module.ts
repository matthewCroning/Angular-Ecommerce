import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { CartShippingComponent } from './cart-shipping/cart-shipping.component';
import { CartDeliveryInformationComponent } from './cart-delivery-information/cart-delivery-information.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'delivery',
    component: CartDeliveryInformationComponent
  },
  {
    path: 'shipping',
    component: CartShippingComponent
  },
  {
    path: 'payment',
    component: CartPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
