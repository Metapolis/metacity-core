import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AnimatedBackgroundComponent } from "./animated-background.component";

describe("AnimatedBackgroundComponent", () => {
  let component: AnimatedBackgroundComponent;
  let fixture: ComponentFixture<AnimatedBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
