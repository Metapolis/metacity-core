import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsedDataComponent } from "./used-data.component";

describe("UsedDataComponent", () => {
  let component: UsedDataComponent;
  let fixture: ComponentFixture<UsedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
