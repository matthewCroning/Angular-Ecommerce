import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { GalleryModule } from 'ng-gallery';
import { ImgMagnifier } from 'ng-img-magnifier';

@NgModule({
  declarations: [    
    ListProductsComponent,
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    GalleryModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }

