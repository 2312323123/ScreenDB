import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackscategoriescontainerComponent } from './packscategoriescontainer.component';

describe('PackscategoriescontainerComponent', () => {
  let component: PackscategoriescontainerComponent;
  let fixture: ComponentFixture<PackscategoriescontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackscategoriescontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackscategoriescontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
