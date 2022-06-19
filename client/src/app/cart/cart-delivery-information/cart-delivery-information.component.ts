import { UserDetailsService } from './../../shared/services/user-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-delivery-information',
  templateUrl: './cart-delivery-information.component.html',
  styleUrls: ['./cart-delivery-information.component.scss']
})
export class CartDeliveryInformationComponent implements OnInit {

  constructor(public UserDetailsService: UserDetailsService) { }

  ngOnInit(): void {
  }

}
