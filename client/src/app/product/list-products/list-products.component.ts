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
  searchText: any;
  pages: any = [];
  limit = 16;

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

    this.page = this.route.snapshot.paramMap.get('page') ? Number(this.route.snapshot.paramMap.get('page')) : 1;
    this.sort = this.route.snapshot.paramMap.get('sort') ? String(this.route.snapshot.paramMap.get('sort')) : "name";
    this.order = this.route.snapshot.paramMap.get('order') ? Number(this.route.snapshot.paramMap.get('order')) : 1;
    this.searchText =  this.route.snapshot.paramMap.get('search') ? String(this.route.snapshot.paramMap.get('search')) : "";

    var start = this.page - 2;
    while(this.pages.length <= 4){
      if(start > 0){
        this.pages.push(start);
      }
      start++;
    }
    
    this.ProductService.find(this.limit, this.page, this.sort, this.order, this.searchText).subscribe((products: any) => {
      this.products = products;
    })
  }

  ngOnInit(): void {
  }


  goToPage(page: any){
    this.page = page;
    this.router.navigateByUrl('/product/'  +  this.page + "/" + this.sort + "/" + this.order + "/" + this.searchText,  {skipLocationChange: false}).then(() => {
      this.router.navigate(['/product/' +  this.page + "/" + this.sort + "/" + this.order + "/" + this.searchText]);
    });
  }

  search(){

  }

  sortProducts(sort: any){
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

  getLowestPrice(variations: any): number{
    var lowest = variations[0].price;
    for(let variation of variations){
      lowest = Math.min(variation.price, lowest);
    }

    return lowest;
  }

  changeSelected(selected: any, product: any){
    for(let currProduct of this.products){
      if(currProduct === product){
        product['selected'] = selected;
      }
    }
  }

  viewProduct(product: any){
    console.log(product);
    if(product.selected){
      this.router.navigate(['/product/view/' +  product._id + "/" + product.selected._id]);
    } else {
      this.router.navigate(['/product/view/' +  product._id + "/" + product.productVariations[0]._id]);
    }
  }


}
