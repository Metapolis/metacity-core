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
    service.getLocations().clear();
    const locations = service.getLocations();
    expect(locations).toBeDefined();
  }));

  it("should set a list of Locations", inject([LocationService], (service: LocationService) => {
    service.getLocations().clear();
    service.addLocation(
      "SALT_LAKE_CITY", {
        name: "Salt Lake City",
        gpsCoordinates: {
          center: new L.LatLng(0, 0)
        }
      }
    );
    expect(service.getLocation("SALT_LAKE_CITY").name).toEqual("Salt Lake City");
  }));

  it("should add a new Location to the list of Locations", inject([LocationService], (service: LocationService) => {
    service.addLocation("SALT_LAKE_CITY",
      {
        name: "Salt Lake City",
        gpsCoordinates: {
          center: new L.LatLng(0, 0)
        }
      }
    );
    service.addLocation("OCEAN_TOWN",
      {
        name: "Ocean Town",
        gpsCoordinates: {
          center: new L.LatLng(0, 0)
        }
      }
    );
    expect(service.getLocation("OCEAN_TOWN").name).toEqual("Ocean Town");
  }));

  it("should contains mock Locations by default", inject([LocationService], (service: LocationService) => {
    expect(service.getLocation("LA_ROCHELLE").name).toEqual("La Rochelle");
    expect(service.getLocation("BORDEAUX").name).toEqual("Bordeaux");
  }));

  it("should access a Location by it's name/ID", inject([LocationService], (service: LocationService) => {
    service.addLocation("SALT_LAKE_CITY",
        {
          name: "Salt Lake City",
          gpsCoordinates: {
            center: new L.LatLng(0, 0)
          }
        });
    service.addLocation("OCEAN_TOWN",
        {
          name: "Ocean Town",
          gpsCoordinates: {
            center: new L.LatLng(0, 0)
          }
        });
    expect(service.getLocation("SALT_LAKE_CITY")).toBeDefined();
  }));

  it("should return current Location", inject([LocationService], (service: LocationService) => {
    service.setCurrentLocationKey("SALT_LAKE_CITY");
    expect(service.getCurrentLocationKey()).toEqual("SALT_LAKE_CITY");
  }));

  it("should have current Location set up by mock data", inject([LocationService], (service: LocationService) => {
    service.setCurrentLocationKey("LA_ROCHELLE");
    expect(service.getCurrentLocationKey()).toEqual("LA_ROCHELLE");
    expect(service.getCurrentLocation().name).toEqual("La Rochelle");
  }));

  it("should have helper to get current location name", inject([LocationService], (service: LocationService) => {
    expect(service.getCurrentLocationName()).toBe(service.getCurrentLocation().name);
  }));
});
