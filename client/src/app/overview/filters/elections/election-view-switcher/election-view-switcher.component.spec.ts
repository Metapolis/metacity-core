import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ElectionViewSwitcherComponent } from "./election-view-switcher.component";
import { FilterViewSwitcherComponent } from "../../filter-view-switcher/filter-view-switcher.component";

describe("ElectionViewSwitcherComponent", () => {
  let component: ElectionViewSwitcherComponent;
  let fixture: ComponentFixture<ElectionViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElectionViewSwitcherComponent, FilterViewSwitcherComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
