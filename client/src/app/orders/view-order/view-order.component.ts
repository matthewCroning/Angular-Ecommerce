import { OrdersService } from './../../shared/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  orderId: any;
  order: any;
  constructor(private route: ActivatedRoute, public OrdersService: OrdersService) { 
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.OrdersService.findOrder(this.orderId).subscribe((order: any) => {
      this.order = order;
    })
  }

  ngOnInit(): void {
  }

}
