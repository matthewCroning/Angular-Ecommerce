import { UserDetailsService } from './../../shared/services/user-details.service';
import { Component, OnInit } from '@angular/core';
import { slideInLeftOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-cart-shipping',
  templateUrl: './cart-shipping.component.html',
  styleUrls: ['./cart-shipping.component.scss'],
  animations: [
    slideInLeftOnEnterAnimation({anchor: 'enterSlideLeft', delay: 50 , duration: 500, translate: '100px'})
  ]
})
export class CartShippingComponent implements OnInit {

  public shippingMethod: any;
  constructor(public UserDetailsService: UserDetailsService) { 
    this.shippingMethod = "Standard Shipping"
    this.shippingMethod = UserDetailsService.getShippingMethod();
  }

  ngOnInit(): void {
  }

  changeShippingMethod(method: any){
    this.shippingMethod = method;
  }

  submit(){
    this.UserDetailsService.changeShippingMethod(this.shippingMethod);
  }

}
