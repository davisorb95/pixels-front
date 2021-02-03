import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsTableComponent } from './donors-table.component';

describe('DonorsTableComponent', () => {
  let component: DonorsTableComponent;
  let fixture: ComponentFixture<DonorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
