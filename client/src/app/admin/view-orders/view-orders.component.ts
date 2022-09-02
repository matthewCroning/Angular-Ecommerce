import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  orders: any;
  status: any;
  constructor(private OrdersService: OrdersService, private route: ActivatedRoute) {
    this.status = this.route.snapshot.paramMap.get('status')
    this.OrdersService.findAll(this.route.snapshot.paramMap.get('status')).subscribe( (orders:any) => {
      this.orders = orders;
      
    })
   }

  ngOnInit(): void {
  }


}
