import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllunspecifiedviewComponent } from './allunspecifiedview.component';

describe('AllunspecifiedviewComponent', () => {
  let component: AllunspecifiedviewComponent;
  let fixture: ComponentFixture<AllunspecifiedviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllunspecifiedviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllunspecifiedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
