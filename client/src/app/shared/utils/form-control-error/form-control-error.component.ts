import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormControlErrorUtil{

  constructor() {}

  returnError(formControl: any){
    var error = "";
    console.log(formControl.errors)
    console.log(formControl)
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
