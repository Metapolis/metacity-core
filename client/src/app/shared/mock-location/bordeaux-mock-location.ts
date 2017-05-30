import { Location } from "../location.service";

// https://nominatim.openstreetmap.org/details.php?place_id=158634976
export const BORDEAUX: Location = {
  name: "Bordeaux",
  gpsCoordinates: {
    center: new L.LatLng(44.841225, -0.5800363),
    relation: 105270
  }
};
