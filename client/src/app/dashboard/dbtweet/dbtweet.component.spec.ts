import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterTestingModule } from "@angular/router/testing";

import { DbtweetComponent } from "./dbtweet.component";
import { DashboardComponent } from "../dashboard.component";
import { UsedDataComponent } from "../shared/used-data/used-data.component";
import { DashboardCardContainerComponent } from "../shared/dashboard-card-container/dashboard-card-container.component";
import { WordcloudCardContainerComponent } from "../shared/wordcloud-card-container/wordcloud-card-container.component";
import { SourceCardContainerComponent } from "../shared/source-card-container/source-card-container.component";

import { AssetService } from "../../shared/asset.service";
import { LocationService } from "../../shared/location.service";

describe("DbtweetComponent", () => {
  let component: DbtweetComponent;
  let fixture: ComponentFixture<DbtweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbtweetComponent, DashboardComponent, UsedDataComponent,
        DashboardCardContainerComponent, WordcloudCardContainerComponent, SourceCardContainerComponent],
      providers: [AssetService, LocationService],
      imports: [RouterTestingModule]
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
