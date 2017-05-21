import * as d3 from 'd3';

export class AccidentMapSpecific {
  filter: number[];
  filterMap: {
    [index: number]: string
  } = {};
  collisionMap: {
    [index: number]: string
  } = {};

  constructor() {
    this.filter = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.filterMap[1] = 'Normale';
    this.filterMap[2] = 'Pluie légère';
    this.filterMap[3] = 'Pluie forte';
    this.filterMap[4] = 'Neige - grêle';
    this.filterMap[5] = 'Brouillard - fumée';
    this.filterMap[6] = 'Vent fort - tempête';
    this.filterMap[7] = 'Temps éblouissant';
    this.filterMap[8] = 'Temps couvert';
    this.filterMap[9] = 'Autre';

    this.collisionMap[1] = 'Deux véhicules - frontale';
    this.collisionMap[2] = 'Deux véhicules - par l’arrière';
    this.collisionMap[3] = 'Deux véhicules - par le coté';
    this.collisionMap[4] = 'Trois véhicules et plus – en chaîne';
    this.collisionMap[5] = 'Trois véhicules et plus  - collisions multiples';
    this.collisionMap[6] = 'Autre collision';
    this.collisionMap[7] = 'Sans collision';
  }

  onMapReady(map: L.Map) {
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };
    d3.json('assets/mock-data/accidents.json', (err, data) => {

      const pdata = data as {
        id: number,
        location: { address: string, lat_lon: L.LatLngExpression },
        climatology: { atmosphericCondition: number, luminosity: number },
        collisionType: number
      }[];

      pdata.forEach((item, index, array) => {
        if (item.climatology.atmosphericCondition in this.filter) {
          const lat_lon = [item.location.lat_lon[0] / 100000, item.location.lat_lon[1] / 100000] as L.LatLngExpression;
          const layer = L.marker(lat_lon, icon);
          layer.bindPopup(
            '<h6>' + item.location.address + '</h6>' +
            '<hr>' +
            '<b>meteo</b>: ' + this.filterMap[item.climatology.atmosphericCondition] +
            '<br>' +
            '<b>type de collision</b>: ' + this.collisionMap[item.collisionType] +
            ''
          );
          layer.addTo(map);
        }
      });
    });
  }
}
