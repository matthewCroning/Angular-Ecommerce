import { OrdersService } from './../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  orders: any;
  
  constructor(public OrdersService: OrdersService) {
    this.OrdersService.findUserOrders().subscribe((orders:any) => {
      console.log(orders)
      this.orders = orders;
    })
   }

  ngOnInit(): void {
  }

}
