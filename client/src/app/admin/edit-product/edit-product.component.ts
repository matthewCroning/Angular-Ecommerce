import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { FormControlErrorUtil } from './../../shared/utils/form-control-error/form-control-error.component';
import { FormsCreator } from './../../shared/utils/formsCreator.component';
import { FormGroup } from '@angular/forms';
import { AdminService } from './../../shared/services/admin.service';
import { ProductService } from './../../shared/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public productEditForm!: any;
  product: any = {};
  products: any = [];
  productVariation: any = {};
  constructor(public AdminService: AdminService, 
    public FormsCreator: FormsCreator,
    public FormControlErrorUtil: FormControlErrorUtil,
    public AlertService: AlertService,
    public ProductService: ProductService) { 
    this.productEditForm = FormsCreator.getProductEditForm();
    this.ProductService.findAll().subscribe((products: any) => {
      this.products = products;
    })
 }

 ngOnInit(): void {

 }

 edit(){
  if(this.productEditForm.valid){
    for (const field in this.productEditForm.controls) {
      this.product[field] = this.productEditForm.get(field).value   
    }

    this.product.tag = this.productEditForm.get("tags").value.split(" ");

    this.AdminService.editProduct(this.product, this.product._id).subscribe((data: any) => {
      this.AlertService.sendAlert(data.message);
    })
  } else {
    this.AlertService.sendAlert("Cant Create Product & Variation. Complete form correctly")
  }    
 }

 changeProduct(){
  this.productEditForm.controls['name'].setValue(this.product.name);
  this.productEditForm.controls['brand'].setValue(this.product.brand);
  this.productEditForm.controls['description'].setValue(this.product.description);
  console.log(this.product.tags);
  this.productEditForm.controls['tags'].setValue(this.product.tag.join(" "));
  
 }

}
