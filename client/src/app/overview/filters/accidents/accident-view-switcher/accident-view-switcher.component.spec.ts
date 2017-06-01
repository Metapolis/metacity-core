import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AccidentViewSwitcherComponent } from "./accident-view-switcher.component";
import { FilterViewSwitcherComponent } from "../../filter-view-switcher/filter-view-switcher.component";

describe("AccidentViewSwitcherComponent", () => {
  let component: AccidentViewSwitcherComponent;
  let fixture: ComponentFixture<AccidentViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentViewSwitcherComponent, FilterViewSwitcherComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
