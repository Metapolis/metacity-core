import * as d3 from 'd3';

export class AccidentMapSpecific {
  weatherFilters: number[];
  weatherFiltersMap: {
    [index: number]: string
  } = {};
  collisionMap: {
    [index: number]: string
  } = {};
  icon: any;
  map: L.Map;
  layers: L.Layer[];
  layerGroup: L.LayerGroup;

  constructor() {
    this.weatherFilters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.layers = [];
    this.icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };

    this.weatherFiltersMap[1] = 'Normale';
    this.weatherFiltersMap[2] = 'Pluie légère';
    this.weatherFiltersMap[3] = 'Pluie forte';
    this.weatherFiltersMap[4] = 'Neige - grêle';
    this.weatherFiltersMap[5] = 'Brouillard - fumée';
    this.weatherFiltersMap[6] = 'Vent fort - tempête';
    this.weatherFiltersMap[7] = 'Temps éblouissant';
    this.weatherFiltersMap[8] = 'Temps couvert';
    this.weatherFiltersMap[9] = 'Autre';

    this.collisionMap[1] = 'Deux véhicules - frontale';
    this.collisionMap[2] = 'Deux véhicules - par l’arrière';
    this.collisionMap[3] = 'Deux véhicules - par le coté';
    this.collisionMap[4] = 'Trois véhicules et plus – en chaîne';
    this.collisionMap[5] = 'Trois véhicules et plus  - collisions multiples';
    this.collisionMap[6] = 'Autre collision';
    this.collisionMap[7] = 'Sans collision';
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.draw();
  }

  public reDraw(): void {
    console.log(this.weatherFilters);

    // if (this.map.hasLayer) {
    //   this.map.removeLayer(this.layerGroup);
    // }
    // this.layerGroup.clearLayers();

    this.draw();
  }

  public setWeatherFilters(weatherFilters: number[]): void {
    this.weatherFilters = weatherFilters;
  }

  public draw(): void {
    d3.json('assets/mock-data/accidents.json', (err, data) => {

      const pdata = data as {
        id: number,
        location: { address: string, lat_lon: L.LatLngExpression },
        climatology: { atmosphericCondition: number, luminosity: number },
        collisionType: number
      }[];

      pdata.forEach((item, index, array) => {
        if (item.climatology.atmosphericCondition in this.weatherFilters) {
          const lat_lon = [item.location.lat_lon[0] / 100000, item.location.lat_lon[1] / 100000] as L.LatLngExpression;
          const layer = L.marker(lat_lon, this.icon);
          layer.bindPopup(
            '<h6>' + item.location.address + '</h6>' +
            '<hr>' +
            '<b>meteo</b>: ' + this.weatherFiltersMap[item.climatology.atmosphericCondition] +
            '<br>' +
            '<b>type de collision</b>: ' + this.collisionMap[item.collisionType]
          );
          this.layers.push(layer);
        }
      });

      this.layerGroup = L.layerGroup(this.layers);
      this.layerGroup.addTo(this.map);
    });
  }
}
