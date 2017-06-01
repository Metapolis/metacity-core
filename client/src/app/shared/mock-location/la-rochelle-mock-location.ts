import { Location } from "../location.service";

const lat: number = 46.1591126;
const lon: number = -1.1520433;
export const LA_ROCHELLE: Location = {
  name: "La Rochelle",
  gpsCoordinates: {
    center: new L.LatLng(lat, lon),
    relation: 117858
  }
};
