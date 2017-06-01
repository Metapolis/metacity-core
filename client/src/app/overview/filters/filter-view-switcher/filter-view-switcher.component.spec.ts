import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FilterViewSwitcherComponent } from "./filter-view-switcher.component";

describe("FilterViewSwitcherComponent", () => {
  let component: FilterViewSwitcherComponent;
  let fixture: ComponentFixture<FilterViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterViewSwitcherComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
