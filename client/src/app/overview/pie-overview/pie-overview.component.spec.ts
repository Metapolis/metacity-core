import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieOverviewComponent } from './pie-overview.component';

describe('PieOverviewComponent', () => {
  let component: PieOverviewComponent;
  let fixture: ComponentFixture<PieOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
