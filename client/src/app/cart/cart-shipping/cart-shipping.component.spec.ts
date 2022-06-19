import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShippingComponent } from './cart-shipping.component';

describe('CartShippingComponent', () => {
  let component: CartShippingComponent;
  let fixture: ComponentFixture<CartShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
