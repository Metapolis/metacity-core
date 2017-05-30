import { Injectable } from "@angular/core";
import * as L from "leaflet";

interface Location {
  name: string;
  gpsCoordinates: {
    center: L.LatLng,
    bounds: L.LatLngBounds
  };
}

@Injectable()
export class LocationService {

  private locations: Location[];

  constructor() {
    this.locations = new Array<Location>();
  }

  public getLocations(): Location[] {
    return this.locations;
  }

  public setLocations(locations: Location[]): void {
    this.locations = locations;
  }

  public addLocation(location: Location): void {
    this.locations.push(location);
  }
}
