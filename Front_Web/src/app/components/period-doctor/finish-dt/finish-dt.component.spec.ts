import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishDtComponent } from './finish-dt.component';

describe('FinishDtComponent', () => {
  let component: FinishDtComponent;
  let fixture: ComponentFixture<FinishDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishDtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
