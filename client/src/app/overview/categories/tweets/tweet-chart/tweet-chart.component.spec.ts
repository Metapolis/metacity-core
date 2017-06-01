import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TweetChartComponent } from "./tweet-chart.component";
import { SimpleCardComponent } from "../../../common/simple-card/simple-card.component";
import { GenericNavPanelComponent } from "../../../nav-pannels/generic-nav-panel/generic-nav-panel.component";
import { TwoColumnsTemplateComponent } from "../../../templates/two-columns/two-columns-template.component";

import { AssetService } from "../../../../shared/asset.service";
import { LocationService } from "../../../../shared/location.service";

describe("TweetChartComponent", () => {
  let component: TweetChartComponent;
  let fixture: ComponentFixture<TweetChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TweetChartComponent, GenericNavPanelComponent, TwoColumnsTemplateComponent, SimpleCardComponent],
      providers: [AssetService, LocationService],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
