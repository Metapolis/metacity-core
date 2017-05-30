import { Injectable } from "@angular/core";
import { LA_ROCHELLE } from "./mock-location/la-rochelle-mock-location";
import { BORDEAUX } from "./mock-location/bordeaux-mock-location";
import * as L from "leaflet";

export interface Location {
  name: string;
  gpsCoordinates: {
    center: L.LatLng,
    bounds: L.LatLngBounds
  };
}

@Injectable()
export class LocationService {

  private locations: Map<string, Location>;

  constructor() {
    this.locations = new Map<string, Location>();
    this.addLocation("LA_ROCHELLE", LA_ROCHELLE);
    this.addLocation("BORDEAUX", BORDEAUX);
  }

  public getLocations(): Map<string, Location> {
    return this.locations;
  }

  public setLocations(locations: Map<string, Location>): void {
    this.locations = locations;
  }

  public getLocation(key: string): Location {
    return this.locations.get(key);
  }

  public addLocation(locationKey: string, location: Location): void {
    this.locations.set(locationKey, location);
  }
}
