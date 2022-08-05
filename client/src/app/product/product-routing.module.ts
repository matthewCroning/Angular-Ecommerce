import { ViewProductComponent } from './view-product/view-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { execPath } from 'process';

const routes: Routes = [

  {
    path: 'view/:productId',
    component: ViewProductComponent,
  },
  {
    path: ':page/:sort/:order',
    component: ListProductsComponent
  },
  {
    path: ':page',
    component: ListProductsComponent
  },
  {
    path: '',
    component: ListProductsComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
