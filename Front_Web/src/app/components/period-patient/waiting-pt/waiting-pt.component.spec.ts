import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPtComponent } from './waiting-pt.component';

describe('WaitingPtComponent', () => {
  let component: WaitingPtComponent;
  let fixture: ComponentFixture<WaitingPtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingPtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingPtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
