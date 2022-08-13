import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductVariationComponent } from './create-product-variation.component';

describe('CreateProductVariationComponent', () => {
  let component: CreateProductVariationComponent;
  let fixture: ComponentFixture<CreateProductVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductVariationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
