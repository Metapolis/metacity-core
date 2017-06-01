import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColumsComponent } from './two-colums.component';

describe('TwoColumsComponent', () => {
  let component: TwoColumsComponent;
  let fixture: ComponentFixture<TwoColumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoColumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
