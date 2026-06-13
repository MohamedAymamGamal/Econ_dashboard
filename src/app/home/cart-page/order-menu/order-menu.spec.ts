import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMenu } from './order-menu';

describe('OrderMenu', () => {
  let component: OrderMenu;
  let fixture: ComponentFixture<OrderMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
