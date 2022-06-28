import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [    
    ListProductsComponent,
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ]
})
export class ProductModule { }
