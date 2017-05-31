import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbtweetComponent } from './dbtweet.component';

describe('DbtweetComponent', () => {
  let component: DbtweetComponent;
  let fixture: ComponentFixture<DbtweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbtweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbtweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
