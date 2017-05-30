import { TestBed, inject } from "@angular/core/testing";

import { LocationService } from "./location.service";

describe("LocationService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService]
    });
  });

  it("should be created", inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));

  it("should get an empty Location interface", inject([LocationService], (service: LocationService) => {
    const locations = service.getLocations();
    expect(locations).toBeDefined();
    expect(locations).toEqual([]);
  }));

  it("should set a list of Locations", inject([LocationService], (service: LocationService) => {
    expect(service.getLocations()).toEqual([]);
    service.setLocations(
      [{
        name: "Salt Lake City",
        gpsCoordinates: {
          center: new L.LatLng(0, 0),
          bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
        }
      }]
    );
    expect(service.getLocations()[0].name).toEqual("Salt Lake City");
  }));
});
