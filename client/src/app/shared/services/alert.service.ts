import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert: Subject<String> = new Subject();;
  
  constructor() { }

  sendAlert(alertMessage: String){
    this.alert.next(alertMessage);
  }
}
