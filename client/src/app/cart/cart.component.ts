import { ProductService } from './../shared/services/product.service';
import { CartService } from './../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public CartService: CartService, public ProductService: ProductService) { }

  ngOnInit(): void {
  }

}
