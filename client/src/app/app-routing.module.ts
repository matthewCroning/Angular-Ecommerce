import { AdminAuthGuard } from './shared/interceptor/adminAuth.guard';
import { CartComponent } from './cart/cart.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/interceptor/auth.guard';

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
    canLoad:[AdminAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  { 
    path: '',
    loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminAuthGuard]
})
export class AppRoutingModule { }
