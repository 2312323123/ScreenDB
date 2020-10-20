import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCategoryViewComponent } from './pack-category-view.component';

describe('PackCategoryViewComponent', () => {
  let component: PackCategoryViewComponent;
  let fixture: ComponentFixture<PackCategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackCategoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
