import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './create-product/create-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProductVariationComponent } from './create-product-variation/create-product-variation.component';
import { AdminComponent } from './admin/admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CreateProductComponent, CreateProductVariationComponent, AdminComponent, EditProductComponent, ViewOrdersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
