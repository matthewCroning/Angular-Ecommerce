import { ImageFileService } from './../../shared/services/image-file.service';
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
  imageObj: any = [];
  imageForm!: FormData;
  images = new Set();
  constructor(public AdminService: AdminService, 
    public FormsCreator: FormsCreator,
    public FormControlErrorUtil: FormControlErrorUtil,
    public AlertService: AlertService,
    public ProductService: ProductService,
    public ImageFileService: ImageFileService) { 
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

  onImagePicked(event: Event): void {
    let upload = event!.target! as HTMLInputElement;
    this.imageObj = [];
    console.log(upload!.files!.length);
    for(var i = 0; i < upload!.files!.length; i++){
      let FILE = upload?.files?.[i];
      console.log(FILE);
      this.imageObj.push(FILE);   
    }     

    this.imageForm = new FormData();
    for(let image of this.imageObj){
     this.imageForm.append('image', image);
    }
    console.log(this.imageObj);
    console.log(this.imageForm);
    this.onImageUpload();
  }

  onImageUpload() {
   this.ImageFileService.imageUpload(this.imageForm).subscribe((images: any) => {
    console.log(images);  
    for(let image of images.images){
        this.images.add(image);
      }
   });
  }

  removeImage(image: any){
    this.images.delete(image);
    image = image.split('/');
    var fileName = image[image.length-1]
    this.ImageFileService.deleteFromAWS(fileName).subscribe((data: any)=> {
      console.log(data);
    })
  }

}
