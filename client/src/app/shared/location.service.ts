import { Injectable } from "@angular/core";
import { LA_ROCHELLE } from "./mock-location/la-rochelle-mock-location";
import { BORDEAUX } from "./mock-location/bordeaux-mock-location";
import * as L from "leaflet";

export interface Location {
  name: string;
  gpsCoordinates: {
    center: L.LatLng,
    relation?: number
  };
}

@Injectable()
export class LocationService {

  private locations: Map<string, Location>;
  private currentLocationKey: string;

  constructor() {
    this.locations = new Map<string, Location>();
    this.addLocation("LA_ROCHELLE", LA_ROCHELLE);
    this.addLocation("BORDEAUX", BORDEAUX);
    // this.setCurrentLocationKey("LA_ROCHELLE");
    this.setCurrentLocationKey("BORDEAUX");
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

  public setCurrentLocationKey(currentLocationKey: string): void {
    this.currentLocationKey = currentLocationKey;
  }

  public getCurrentLocationKey(): string {
    return this.currentLocationKey;
  }

  public getCurrentLocation(): Location {
    return this.getLocation(this.currentLocationKey);
  }

  public getCurrentLocationName(): string {
    return this.getCurrentLocation().name;
  }
}
