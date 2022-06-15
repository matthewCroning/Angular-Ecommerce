import { CartService } from './../../shared/services/cart.service';
import { Product } from 'puppeteer';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  product!: any;

  constructor(private ProductService: ProductService, private route: ActivatedRoute, public CartService: CartService) {
    this.ProductService.findProductById(this.route.snapshot.paramMap.get('productId')).subscribe((product: any) => {
      this.product = product;
    })
  }

  ngOnInit(): void {
  }

}
