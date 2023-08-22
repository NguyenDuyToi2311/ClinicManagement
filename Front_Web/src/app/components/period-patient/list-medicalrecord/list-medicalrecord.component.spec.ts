import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalrecordComponent } from './list-medicalrecord.component';

describe('ListMedicalrecordComponent', () => {
  let component: ListMedicalrecordComponent;
  let fixture: ComponentFixture<ListMedicalrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicalrecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedicalrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
