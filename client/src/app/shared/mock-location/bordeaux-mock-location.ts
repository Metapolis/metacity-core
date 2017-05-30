import { Location } from "../location.service";

export const BORDEAUX: Location = {
    name: "Bordeaux",
    gpsCoordinates: {
      center: new L.LatLng(0, 0),
      bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
    }
};
