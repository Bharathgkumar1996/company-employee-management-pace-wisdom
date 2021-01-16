import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydetailComponent } from './companydetail.component';

describe('CompanydetailComponent', () => {
  let component: CompanydetailComponent;
  let fixture: ComponentFixture<CompanydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
