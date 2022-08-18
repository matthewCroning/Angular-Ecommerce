import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminComponent } from './admin/admin.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductVariationComponent } from './create-product-variation/create-product-variation.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'createProduct',
    component: CreateProductComponent
  },
  {
    path: 'createProductVariation',
    component: CreateProductVariationComponent
  },
  {
    path: 'editProduct',
    component: EditProductComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
