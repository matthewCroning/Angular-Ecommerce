import { UserDetailsService } from './../../shared/services/user-details.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-delivery-information',
  templateUrl: './cart-delivery-information.component.html',
  styleUrls: ['./cart-delivery-information.component.scss']
})
export class CartDeliveryInformationComponent implements OnInit {

  public deliveryDetailsForm!: FormGroup;
  
  constructor(public UserDetailsService: UserDetailsService) {
    this.deliveryDetailsForm = new FormGroup({
      firstName: new FormControl((''),Validators.required),
      lastName: new FormControl((''),Validators.required),
      email: new FormControl((''),[Validators.required, Validators.email]),
      phone: new FormControl((''), [Validators.minLength(10), Validators.maxLength(10),Validators.required]),
      company: new FormControl(),
      address: new FormGroup({
        address: new FormControl((''), Validators.required),
        suburb: new FormControl((''),Validators.required),
        apartment: new FormControl(),
        state: new FormControl(Validators.required),
        postcode: new FormControl(Validators.required, Validators.minLength(4)),        
      })
     }); 

   }

  ngOnInit(): void {
  }

  returnError(formControl: any){
    var error = "";
    console.log(formControl.errors)
    console.log(formControl.name)
    if(formControl.errors?.['required']){
      error += "This field is required";
    }
    if(formControl.errors?.['email']){
      error += "Not a valid email";
    }
    if(formControl.errors?.['minlength']){
      error += "Minimum Length must be " + formControl.errors?.['minlength'].requiredLength; 
    }
    if(formControl.errors?.['maxlength']){
      error += "Maximum Length must be " + + formControl.errors?.['maxlength'].requiredLength;  
    }
    return error;
  }

}
