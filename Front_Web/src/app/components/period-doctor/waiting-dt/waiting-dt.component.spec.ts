import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingDtComponent } from './waiting-dt.component';

describe('WaitingDtComponent', () => {
  let component: WaitingDtComponent;
  let fixture: ComponentFixture<WaitingDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingDtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
