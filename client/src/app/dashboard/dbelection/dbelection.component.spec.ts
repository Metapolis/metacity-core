import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DbelectionComponent } from "./dbelection.component";

describe("DbelectionComponent", () => {
  let component: DbelectionComponent;
  let fixture: ComponentFixture<DbelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
