import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Functions{

  constructor() { }

  ngOnInit(): void {
  }
    
  counter(i: number) {
     return new Array(i);
  }
}
