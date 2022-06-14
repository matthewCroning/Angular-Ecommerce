import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'puppeteer';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products!: any[];
  
  constructor(private ProductService: ProductService) { 
    this.ProductService.findAll().subscribe((products: any) => {
      this.products = products;
    })
  }

  ngOnInit(): void {
  }

}
