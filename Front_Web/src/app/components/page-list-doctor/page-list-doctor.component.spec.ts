import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListDoctorComponent } from './page-list-doctor.component';

describe('PageListDoctorComponent', () => {
  let component: PageListDoctorComponent;
  let fixture: ComponentFixture<PageListDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
