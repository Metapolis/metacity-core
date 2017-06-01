import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterTestingModule } from "@angular/router/testing";

import { DashboardCardContainerComponent } from "./dashboard-card-container.component";

describe("DashboardCardContainerComponent", () => {
  let component: DashboardCardContainerComponent;
  let fixture: ComponentFixture<DashboardCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCardContainerComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
