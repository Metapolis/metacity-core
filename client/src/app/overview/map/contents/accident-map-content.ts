import * as d3 from "d3-request";
import { MapSpecific } from "./map-specific";
import * as fmt from "sprintf-js";

const ICON_SIZE: number = 50;
const ICON_OFFSET: number = 25;
const ONE_HUNDRED_THOUSAND: number = 100000;

export class AccidentMapSpecific implements MapSpecific {
  private weatherFilters: number[];
  private weatherFiltersMap: string[];
  private collisionMap: string[];
  private icon: {
    icon: L.Icon
  };
  private map: L.Map;
  private layers: L.Layer[];
  private layerGroup: L.LayerGroup;
  private boundaries: L.LatLngBounds;

  constructor() {
    this.weatherFilters = Array.from({length: 9}, (v, k) => k + 1);
    this.layers = new Array<L.Layer>();
    this.icon = {
      icon: L.icon({
        iconSize: [ICON_SIZE, ICON_SIZE],
        iconAnchor: [ICON_OFFSET, ICON_OFFSET],
        iconUrl: "assets/markers.png",
      })
    };

    this.boundaries = L.latLngBounds(
        L.latLng(46.20360, -1.29690),
        L.latLng(46.12037, -1.05623)
      );


    this.weatherFiltersMap = new Array<string>(
      "Normale",
      "Pluie légère",
      "Pluie forte",
      "Neige - grêle",
      "Brouillard - fumée",
      "Vent fort - tempête",
      "Temps éblouissant",
      "Temps couvert",
      "Autre",
    );

    this.collisionMap = new Array<string>(
      "Deux véhicules - frontale",
      "Deux véhicules - par l’arrière",
      "Deux véhicules - par le coté",
      "Trois véhicules et plus – en chaîne",
      "Trois véhicules et plus  - collisions multiples",
      "Autre collision",
      "Sans collision",
    );
  }

  public onMapReady(map: L.Map) {
    this.map = map;
    this.draw();
  }

  public reDraw(): void {
    this.layerGroup.clearLayers();
    this.layers = [];
    this.draw();
  }

  public setWeatherFilters(weatherFilters: number[]): void {
    this.weatherFilters = weatherFilters;
  }

  public draw(): void {
    d3.json("assets/mock-data/accidents.json", (err, data) => {

      const pdata = data as Array<{
        id: number,
        location: { address: string, lat_lon: L.LatLngExpression },
        climatology: { atmosphericCondition: number, luminosity: number },
        collisionType: number
      }>;

      pdata.forEach((item, index, array) => {
        if (this.weatherFilters.indexOf(item.climatology.atmosphericCondition) >= 0) {
          const lat_lon = [item.location.lat_lon[0] / ONE_HUNDRED_THOUSAND, item.location.lat_lon[1] / ONE_HUNDRED_THOUSAND] as L.LatLngExpression;
          const layer = L.marker(lat_lon, this.icon);
          layer.bindPopup(
            "<h6>" + item.location.address + "</h6>" +
            "<hr>" +
            "<b>meteo</b>: " + this.weatherFiltersMap[item.climatology.atmosphericCondition] +
            "<br>" +
            "<b>type de collision</b>: " + this.collisionMap[item.collisionType]
          );
          this.layers.push(layer);
        }
      });

      this.layerGroup = L.layerGroup(this.layers);
      this.layerGroup.addTo(this.map);

      this.map.on("movestart", () => {
        console.log("Move start event fired");
        const bounds: L.LatLngBounds = this.map.getBounds();
        const nw: L.LatLng = bounds.getNorthWest();
        const se: L.LatLng = bounds.getSouthEast();

        const bounds_query = [
          [nw.lat, nw.lng],
          [se.lat, se.lng]
        ];
        const bounds_query_string: string = fmt.sprintf("[[%f|%f][%f|%f]]", nw.lat, nw.lng, se.lat, se.lng);
        console.log(bounds_query_string);
      });

      this.map.on("moveend", () => {
        console.log("Move end event fired");
        // Refresh data
      })
    });
  }
}
