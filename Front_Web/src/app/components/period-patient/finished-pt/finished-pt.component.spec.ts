import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedPtComponent } from './finished-pt.component';

describe('FinishedPtComponent', () => {
  let component: FinishedPtComponent;
  let fixture: ComponentFixture<FinishedPtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedPtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedPtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
