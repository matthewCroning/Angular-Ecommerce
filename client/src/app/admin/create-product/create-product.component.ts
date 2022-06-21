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

  public productCreateForm!: any;
  product: any = {};
  constructor(public AdminService: AdminService, 
    public FormsCreator: FormsCreator,
    public FormControlErrorUtil: FormControlErrorUtil,
    public AlertService: AlertService) { 
    this.productCreateForm = FormsCreator.getProductCreateForm();
  }

  ngOnInit(): void {
  }

  createProduct(){
    if(this.productCreateForm.valid){
      for (const field in this.productCreateForm.controls) {
        this.product[field] = this.productCreateForm.get(field).value   
      }

      this.AdminService.createProduct(this.product).subscribe((data: any) => {
        this.AlertService.sendAlert(data);
      })
    }

    
  }
  

}
