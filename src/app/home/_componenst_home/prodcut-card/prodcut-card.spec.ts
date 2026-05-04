import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutCard } from './prodcut-card';

describe('ProdcutCard', () => {
  let component: ProdcutCard;
  let fixture: ComponentFixture<ProdcutCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdcutCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
