import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'puppeteer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products!: any[];
  
  constructor(private ProductService: ProductService, private route: ActivatedRoute, private router: Router) { 
    this.ProductService.find(10,0).subscribe((products: any) => {
      this.products = products;
    })
  }

  ngOnInit(): void {
  }

  onScrollUp(event: any){
    console.log("up");
  }

  onScrollDown(event: any){
    this.ProductService.find(this.route.snapshot.paramMap.get('limit'),this.route.snapshot.paramMap.get('page')).subscribe((products: any) => {
      this.products.push(...products);
      var page = Number(this.route.snapshot.paramMap.get('page')) + 1;
      this.router.navigate(['/product/' + this.route.snapshot.paramMap.get('limit') + "/" + page ]);
    })
  }

}
