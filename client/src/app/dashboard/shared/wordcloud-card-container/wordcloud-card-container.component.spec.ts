import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WordcloudCardContainerComponent } from "./wordcloud-card-container.component";

import { AssetService } from "../../../shared/asset.service";
import { LocationService } from "../../../shared/location.service";

describe("WordcloudCardContainerComponent", () => {
  let component: WordcloudCardContainerComponent;
  let fixture: ComponentFixture<WordcloudCardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordcloudCardContainerComponent],
      providers: [AssetService, LocationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordcloudCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
