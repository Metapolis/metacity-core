import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TwoColumnsTemplateComponent } from "./two-columns-template.component";

describe("TwoColumnsTemplateComponent", () => {
  let component: TwoColumnsTemplateComponent;
  let fixture: ComponentFixture<TwoColumnsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoColumnsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
