import { CartService } from './../../services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public AuthService: AuthService, public CartService: CartService) { }

  ngOnInit(): void {
  }

}
