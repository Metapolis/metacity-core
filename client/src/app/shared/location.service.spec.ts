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
          center: new L.LatLng(0, 0),
          bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
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
          center: new L.LatLng(0, 0),
          bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
        }
      }
    );
    service.addLocation("OCEAN_TOWN",
      {
        name: "Ocean Town",
        gpsCoordinates: {
          center: new L.LatLng(0, 0),
          bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
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
            center: new L.LatLng(0, 0),
            bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
          }
        });
    service.addLocation("OCEAN_TOWN",
        {
          name: "Ocean Town",
          gpsCoordinates: {
            center: new L.LatLng(0, 0),
            bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
          }
        });
    expect(service.getLocation("SALT_LAKE_CITY")).toBeDefined();
  }));

});
