import { ListOrdersComponent } from './list-orders/list-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListOrdersComponent
  },
  {
    path: "view/:orderId",
    component: ViewOrderComponent  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
