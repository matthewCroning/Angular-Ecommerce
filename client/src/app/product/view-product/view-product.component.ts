import { CartService } from './../../shared/services/cart.service';
import { Product } from 'puppeteer';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
  animations: [  
    slideInLeftOnEnterAnimation({anchor: 'enterSlideLeft', delay: 50 , duration: 500, translate: '15px'})
  ]
})
export class ViewProductComponent implements OnInit {

  product!: any;
  variationSelected!: any;
  imageSelected!: any;
  constructor(private ProductService: ProductService, private router: Router, private route: ActivatedRoute, public CartService: CartService, private location: Location) {
    this.route.snapshot.paramMap.get('variation');

    this.ProductService.findProductById(this.route.snapshot.paramMap.get('productId')).subscribe((product: any) => {
      this.product = product;
      for(let variation of this.product.productVariations){
        if(variation._id ===  this.route.snapshot.paramMap.get('variation')){
          this.variationSelected = variation;
          this.imageSelected = variation.images[0];
        }
      }
    })


  }

  ngOnInit(): void {
  }

  selectImage(image: any){
    this.imageSelected = image;
  }

  selectVariation(selected: any, product: any){
    this.location.replaceState('product/view/' +  this.route.snapshot.paramMap.get('productId') + "/" + selected);
    
    for(let variation of this.product.productVariations){
      if(variation._id ===  selected){
        this.variationSelected = variation;
        this.imageSelected = variation.images[0];
      }
    }
  
  }

}
