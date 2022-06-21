import { AlertService } from './../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutDownOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({anchor: 'fadeInUp', delay: 50 , duration: 500, translate: '10px'}),
    fadeOutDownOnLeaveAnimation({ anchor: 'fadeOutDown', duration: 500, translate: '10px'})
  ]
})
export class AlertComponent implements OnInit {

  alertMessage: any = null;
  start!: Date;

  
  constructor(public AlertService: AlertService) {
    this.AlertService.alert.subscribe((async alert => {
      this.start = new Date()
      this.alertMessage = null;
      await this.delay(1000);
      this.alertMessage = alert;
     
      setInterval(() => {
        var now = new Date();
        if(now.getTime() - this.start.getTime() > 5000)
          this.alertMessage = null;
      }, 5000);
    }))
   }

  ngOnInit(): void {

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  closeAlert(){
    this.alertMessage = null;
  }

}
