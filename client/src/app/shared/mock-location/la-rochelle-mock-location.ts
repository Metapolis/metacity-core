import { Location } from "../location.service";

export const LA_ROCHELLE: Location = {
  name: "La Rochelle",
  gpsCoordinates: {
    center: new L.LatLng(0, 0),
    bounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(1, 1))
  }
};
