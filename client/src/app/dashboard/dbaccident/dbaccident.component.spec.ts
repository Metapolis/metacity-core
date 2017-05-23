import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DbaccidentComponent } from "./dbaccident.component";

describe("DbaccidentComponent", () => {
  let component: DbaccidentComponent;
  let fixture: ComponentFixture<DbaccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbaccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbaccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
