import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  public userDetailsForm!: FormGroup;
  
  public shippingDetailsForm = this.fb.group({
    shipping: [''],
  });

  public billingDetailsForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    company: [''],
    address: this.fb.group({
      address: [''],
      suburb: [''],
      apartment: [''],
      state: [''],
      postcode: ['']
    }),
  });

  
  constructor(private fb: FormBuilder) {
    this.userDetailsForm = new FormGroup({
      firstName: new FormControl(),
      email: new FormControl()
     }); 

    //  email: ['hammer'],
    // firstName: [''],
    // lastName: [''],
    // company: [''],
    // address: this.fb.group({
    //   address: [''],
    //   suburb: [''],
    //   apartment: [''],
    //   state: [''],
    //   postcode: ['']
    // }),
    // phone: ['']
   }
}
