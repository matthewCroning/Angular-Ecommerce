import { CreateProductComponent } from './create-product/create-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductVariationComponent } from './create-product-variation/create-product-variation.component';

const routes: Routes = [
  {
    path: 'createProduct',
    component: CreateProductComponent
  },
  {
    path: 'createProductVaruation',
    component: CreateProductVariationComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
