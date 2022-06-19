import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDeliveryInformationComponent } from './cart-delivery-information.component';

describe('CartDeliveryInformationComponent', () => {
  let component: CartDeliveryInformationComponent;
  let fixture: ComponentFixture<CartDeliveryInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDeliveryInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDeliveryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
