import { TestBed, inject } from "@angular/core/testing";

import { AssetService } from "./asset.service";
import { LocationService } from "./location.service";

describe("AssetService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetService, LocationService]
    });
  });

  it("should be created", inject([AssetService], (service: AssetService) => {
    expect(service).toBeTruthy();
  }));

  it("should return logo of current Location", inject([AssetService, LocationService], (service: AssetService, location: LocationService) => {
    location.setCurrentLocationKey("LA_ROCHELLE");
    expect(service.locationLogo()).toEqual(
      {
        src: "../assets/img/logo_" + "la_rochelle" + ".png",
        alt: "logo de " + "la_rochelle"
      }
    );
  }));
});
