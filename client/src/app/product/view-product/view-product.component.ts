import { CartService } from './../../shared/services/cart.service';
import { Product } from 'puppeteer';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { slideInLeftOnEnterAnimation } from 'angular-animations';

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
  imageSelected!: any;
  constructor(private ProductService: ProductService, private route: ActivatedRoute, public CartService: CartService) {
    this.ProductService.findProductById(this.route.snapshot.paramMap.get('productId')).subscribe((product: any) => {
      this.product = product;
      this.imageSelected =  this.product.images[0];
    })
  }

  ngOnInit(): void {
  }

  selectImage(image: any){
    this.imageSelected = image;
  }

}
