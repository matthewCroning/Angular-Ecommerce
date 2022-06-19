import { UserDetailsService } from './../../shared/services/user-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-shipping',
  templateUrl: './cart-shipping.component.html',
  styleUrls: ['./cart-shipping.component.scss']
})
export class CartShippingComponent implements OnInit {

  constructor(public UserDetailsService: UserDetailsService) { }

  ngOnInit(): void {
  }

}
