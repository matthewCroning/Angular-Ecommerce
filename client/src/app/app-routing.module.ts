import { CartComponent } from './cart/cart.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: ListProductsComponent,
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full',
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
