import { Location } from "../location.service";

// https://nominatim.openstreetmap.org/details.php?place_id=158634976
const lat: number = 44.841225;
const lon: number = -0.5800363;
export const BORDEAUX: Location = {
  name: "Bordeaux",
  gpsCoordinates: {
    center: new L.LatLng(lat, lon ),
    relation: 105270
  }
};
