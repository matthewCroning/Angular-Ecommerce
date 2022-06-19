import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { CartDeliveryInformationComponent } from './cart/cart-delivery-information/cart-delivery-information.component';
import { CartShippingComponent } from './cart/cart-shipping/cart-shipping.component';
import { CartPaymentComponent } from './cart/cart-payment/cart-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
