import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class FormsCreator{

  constructor() { }

  ngOnInit(): void {
  }

  getDeliveryForm(){
    return new FormGroup({
      firstName: new FormControl((''),Validators.required),
      lastName: new FormControl((''),Validators.required),
      email: new FormControl((''),[Validators.required, Validators.email]),
      phone: new FormControl((''), [Validators.minLength(10), Validators.maxLength(13),Validators.required]),
      company: new FormControl(),
      address: new FormGroup({
        address: new FormControl((''), Validators.required),
        suburb: new FormControl((''),Validators.required),
        apartment: new FormControl(),
        state: new FormControl((''), Validators.required),
        postcode: new FormControl((''), [Validators.required, Validators.minLength(4), Validators.requiredTrue]),        
      })
     }); 
  }

  getProductCreateForm(){
   return new FormGroup({
      name: new FormControl((''),Validators.required),
      description: new FormControl((''),Validators.required),
      imageUrl: new FormControl((''),[Validators.required]),
      price: new FormControl((''), [Validators.required]),
      stockAmount: new FormControl((''), [Validators.required])
    })
  }

}
