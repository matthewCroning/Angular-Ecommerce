import { ViewProductComponent } from './view-product/view-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { execPath } from 'process';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'view/:productId',
    component: ViewProductComponent,
    pathMatch: 'full',
  },
  {
    path: ':limit/:page',
    component: ListProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
