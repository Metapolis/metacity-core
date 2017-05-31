import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DbtweetComponent } from "./dbtweet.component";
import { DashboardComponent } from "../dashboard.component";
import { UsedDataComponent } from "../shared/used-data/used-data.component";

import { AssetService } from "../../shared/asset.service";
import { LocationService } from "../../shared/location.service";

describe("DbtweetComponent", () => {
  let component: DbtweetComponent;
  let fixture: ComponentFixture<DbtweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbtweetComponent, DashboardComponent, UsedDataComponent ],
      providers: [ AssetService, LocationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbtweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
