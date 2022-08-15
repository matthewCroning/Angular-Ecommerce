import { Product } from 'puppeteer';
import { ProductService } from './../../shared/services/product.service';
import { AlertService } from './../../shared/services/alert.service';
import { FormControlErrorUtil } from './../../shared/utils/form-control-error/form-control-error.component';
import { FormsCreator } from './../../shared/utils/formsCreator.component';
import { FormGroup } from '@angular/forms';
import { AdminService } from './../../shared/services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product-variation',
  templateUrl: './create-product-variation.component.html',
  styleUrls: ['./create-product-variation.component.scss']
})
export class CreateProductVariationComponent implements OnInit {

  public productVariationCreateForm!: any;
  productVariation: any = {};
  productId: any;
  products: any;
  constructor(public AdminService: AdminService, 
    public FormsCreator: FormsCreator,
    public FormControlErrorUtil: FormControlErrorUtil,
    public AlertService: AlertService,
    public ProductService: ProductService) { 
      this.ProductService.findAll().subscribe((products: any) => {
        this.products = products;
      })
    this.productVariationCreateForm = FormsCreator.getProductVariationCreateForm();
  }

  ngOnInit(): void {
  }

  createProductVariation(){
    if(this.productVariationCreateForm.valid){
      for (const field in this.productVariationCreateForm.controls) {
        this.productVariation[field] = this.productVariationCreateForm.get(field).value   
      }
      //change String of tags to array of tags
      this.productVariation.images = this.productVariation.images.split(" ");

      this.AdminService.createProductVariation(this.productVariation, this.productId).subscribe((data: any) => {
        this.AlertService.sendAlert(data.message);
      })
    }    
  }

}
