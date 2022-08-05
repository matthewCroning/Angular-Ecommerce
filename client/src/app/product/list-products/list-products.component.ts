import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'puppeteer';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { slideInLeftOnEnterAnimation, fadeInDownOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  animations: [
    slideInLeftOnEnterAnimation({anchor: 'enterSlideLeft', delay: 50 , duration: 500, translate: '100px'}),
    fadeInDownOnEnterAnimation({ anchor: 'enterDown', delay: 50 , duration: 259, translate: '10px'}),
  ]
})
export class ListProductsComponent implements OnInit {

  delay = 100;
  products!: any[];
  productCount!: any;
  page: any;
  order: any;
  sort: any;
  pages: any = [];
  limit = 4;

  constructor(private ProductService: ProductService, private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    
    this.productCount = this.ProductService.getProductCount();

    this.page = Number(this.route.snapshot.paramMap.get('page'));
    this.sort = String(this.route.snapshot.paramMap.get('sort'));
    this.order = Number(this.route.snapshot.paramMap.get('order'));

    if(this.page === 0 && this.sort === 'null' && this.order === 0){
      console.log("no sort, page and order");
      this.page = 1;
      this.sort = "name"
      this.order = 1;
    }
    var start = this.page - 2;
    while(this.pages.length <= 4){
      if(start > 0){
        this.pages.push(start);
      }
      start++;
    }
    
    console.log(this.page, this.sort, this.order);
    this.ProductService.find(this.limit, this.page - 1, this.sort, this.order).subscribe((products: any) => {
      console.log(this.limit);
      console.log(products);
      this.products = products;
    })
  }

  ngOnInit(): void {
  }


  goToPage(page: any){
    this.page = page;
    this.router.navigateByUrl('/product/'  +  this.page + "/" + this.sort + "/" + this.order,  {skipLocationChange: true}).then(() => {
      this.router.navigate(['/product/' +  this.page + "/" + this.sort + "/" + this.order]);
    });
  }

  sortProducts(sort: any){
    console.log(sort.value);
    switch(sort.value) {
      case "popular":
         // if modo 1 is selected do something.
         break;
      case "highToLow":
         this.sort = "price";
         this.order = -1;
         this.goToPage(this.page);
         break;
      case "lowToHigh":
        this.sort = "price";
        this.order = 1;
        this.goToPage(this.page);
         break;
      case "aToZ":
        this.sort = "name";
        this.order = 1;
        this.goToPage(this.page);
        break;
      case "zToA":
        this.sort = "name";
        this.order = -1;
        this.goToPage(this.page);
        break;
    }
  }



}
