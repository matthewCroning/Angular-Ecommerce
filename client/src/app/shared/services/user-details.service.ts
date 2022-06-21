import { FormsCreator } from './../utils/formsCreator.component';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  public userDetailsForm!: FormGroup;
  
  public shippingMethod!: any;

  public deliveryDetailsForm: any;
  
  constructor(public FormsCreator: FormsCreator) {
    this.deliveryDetailsForm = this.FormsCreator.getDeliveryForm();
    this.getDeliveryDetails();
    this.getShippingMethod();
   }

   saveDeliveryDetails(deliveryDetailsForm: any){
    localStorage.setItem('email', this.deliveryDetailsForm.get('email').value);
    localStorage.setItem('firstName', this.deliveryDetailsForm.get('firstName').value);
    localStorage.setItem('lastName', this.deliveryDetailsForm.controls['lastName'].value);
    localStorage.setItem('company', this.deliveryDetailsForm.controls['company'].value);
    localStorage.setItem('phone',this.deliveryDetailsForm.controls['phone'].value);
    localStorage.setItem('address', this.deliveryDetailsForm.controls['address'].controls['address'].value);
    localStorage.setItem('suburb', this.deliveryDetailsForm.controls['address'].controls['suburb'].value);
    localStorage.setItem('apartment', this.deliveryDetailsForm.controls['address'].controls['apartment'].value);
    localStorage.setItem('state', this.deliveryDetailsForm.controls['address'].controls['state'].value);
    localStorage.setItem('postcode', this.deliveryDetailsForm.controls['address'].controls['postcode'].value);
   }

   saveShippingDetails(method: any){
     this.shippingMethod = method;
    localStorage.setItem('shippingMethod', this.shippingMethod);
   }

   getShippingMethod(){
     this.shippingMethod = localStorage.getItem('shippingMethod');

     return this.shippingMethod;
   }

   getDeliveryDetails(){
    this.deliveryDetailsForm.patchValue({
      email: localStorage.getItem('email'), 
      firstName: localStorage.getItem('firstName'), 
      lastName: localStorage.getItem('lastName'), 
      company: localStorage.getItem('company'), 
      phone: localStorage.getItem('phone'), 
    });

    this.deliveryDetailsForm.get('address').patchValue({
      address: localStorage.getItem('address'),  
      suburb: localStorage.getItem('suburb'),  
      apartment: localStorage.getItem('apartment'),  
      state: localStorage.getItem('state'),  
      postcode: localStorage.getItem('postcode')
    });

    return this.deliveryDetailsForm;
   }

   changeDeliveryDetails(deliveryDetailsForm: any){
     this.deliveryDetailsForm = deliveryDetailsForm;
     this.saveDeliveryDetails(deliveryDetailsForm);
   }

   changeShippingMethod(method: any){
     this.shippingMethod = method;
     this.saveShippingDetails(method);
   }

   getContactString(){
     return this.deliveryDetailsForm.controls['email'].value;
   }

   getShippingMethodString(){
     return this.shippingMethod;
   }

   getDeliveryString(){
     var shipToString = 
     this.deliveryDetailsForm.controls['address'].controls['apartment'].value + " " +
     this.deliveryDetailsForm.controls['address'].controls['address'].value + " " +
     this.deliveryDetailsForm.controls['address'].controls['suburb'].value + " " +
     this.deliveryDetailsForm.controls['address'].controls['state'].value + " " +
     this.deliveryDetailsForm.controls['address'].controls['postcode'].value + " " ;  
    
    return shipToString; 
  }
}
