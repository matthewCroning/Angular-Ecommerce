import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  public userDetailsForm = this.fb.group({
    email: ['hammer'],
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
    phone: ['']
  });

  
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

  
  constructor(private fb: FormBuilder) { }
}
