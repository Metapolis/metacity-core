import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCardContainerComponent } from './source-card-container.component';

describe('SourceCardContainerComponent', () => {
  let component: SourceCardContainerComponent;
  let fixture: ComponentFixture<SourceCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceCardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
