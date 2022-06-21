import { FormsCreator } from './../../shared/utils/formsCreator.component';
import { FormControlErrorUtil } from './../../shared/utils/form-control-error/form-control-error.component';
import { UserDetailsService } from './../../shared/services/user-details.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideInLeftOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-cart-delivery-information',
  templateUrl: './cart-delivery-information.component.html',
  styleUrls: ['./cart-delivery-information.component.scss'],
  animations: [
    slideInLeftOnEnterAnimation({anchor: 'enterSlideLeft', delay: 50 , duration: 500, translate: '100px'})
  ]
})
export class CartDeliveryInformationComponent implements OnInit {

  public deliveryDetailsForm!: FormGroup;

  constructor(public UserDetailsService: UserDetailsService, public FormControlErrorUtil: FormControlErrorUtil, public FormsCreator: FormsCreator) {
    this.deliveryDetailsForm = this.FormsCreator.getDeliveryForm();  

    this.deliveryDetailsForm = UserDetailsService.getDeliveryDetails();
  }

  ngOnInit(): void {
  }

  submit(){
    this.UserDetailsService.changeDeliveryDetails(this.deliveryDetailsForm);
  }

}
