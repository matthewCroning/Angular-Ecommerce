import { AlertService } from './../../shared/services/alert.service';
import { FormControlErrorUtil } from './../../shared/utils/form-control-error/form-control-error.component';
import { FormsCreator } from './../../shared/utils/formsCreator.component';
import { FormGroup } from '@angular/forms';
import { AdminService } from './../../shared/services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  
  public productVariationCreateForm!: any;
  public productCreateForm!: any;
  product: any = {};
  productVariation: any = {};
  constructor(public AdminService: AdminService, 
    public FormsCreator: FormsCreator,
    public FormControlErrorUtil: FormControlErrorUtil,
    public AlertService: AlertService) { 
    this.productCreateForm = FormsCreator.getProductCreateForm();
    this.productVariationCreateForm = FormsCreator.getProductVariationCreateForm();
  }

  ngOnInit(): void {
  }

  createProduct(){
    if(this.productCreateForm.valid && this.productVariationCreateForm.valid){
      for (const field in this.productCreateForm.controls) {
        this.product[field] = this.productCreateForm.get(field).value   
      }

      for (const field in this.productVariationCreateForm.controls) {
        this.productVariation[field] = this.productVariationCreateForm.get(field).value   
      }

      //change String of tags to array of tags
      this.product.tags = this.product.tags.split(" ");

      this.productVariation.images = this.productVariation.images.split(" ");

      this.AdminService.createProduct(this.product, this.productVariation).subscribe((data: any) => {
        this.AlertService.sendAlert(data.message);
      })
    } else {
      this.AlertService.sendAlert("Cant Create Product & Variation. Complete form correctly")
    }    
  }
  

}
