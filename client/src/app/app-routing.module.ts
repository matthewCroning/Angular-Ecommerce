import { CartComponent } from './cart/cart.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(mod => mod.CartModule)
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  { 
    path: 'product', 
    loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule)
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  { 
    path: '',
    loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
