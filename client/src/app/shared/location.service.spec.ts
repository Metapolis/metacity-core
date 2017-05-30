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

  it("should get an empty list of cities when not set", inject([LocationService], (service: LocationService) => {
    expect(service.getList()).toBeDefined();
    expect(service.getList()).toEqual([]);
  }));

  it("should set a list of cities", inject([LocationService], (service: LocationService) => {
    expect(service.getList()).toEqual([]);
    service.setList(["Bordeaux", "Salt Lake City", "Boston"]);
    expect(service.getList()).toContain("Salt Lake City");
  }));
});
