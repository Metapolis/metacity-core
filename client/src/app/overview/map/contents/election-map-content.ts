import * as d3 from 'd3';
import { MapSpecific } from './map-specific';

export class ElectionMapSpecific implements MapSpecific {

  option: L.GeoJSONOptions;
  winner: string;
  bureau: string;
  colors: {
    [candidate: string]: string
  } = {};
  map: L.Map;
  roundFilter: string;

  constructor() {
    this.colors['Hollande'] = '#f10d47';
    this.colors['Sarkozy'] = '#0080c5';
    this.bureau = 'assets/mock-data/electoral_bureau_vote_4326.geojson';
    this.winner = 'assets/mock-data/vote_winner.json';

    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };
  }

  public setRoundFilter(roundFilter: string) {
    if (roundFilter !== this.roundFilter) {
      this.roundFilter = roundFilter;
      console.log(this.roundFilter);
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.draw();
  }

  public draw(): void {
    d3.json(this.winner, (err, vote_winner) => {
      let index = 0;

      d3.json(this.bureau, (err2, data) => {
        const featureCollection = data as any;

        L.geoJSON(featureCollection, {
          style: (feature) => {
            if (index < 55) {
              return { color: this.colors[vote_winner[index].candidate.name] };
            }
          },
          onEachFeature: (feature, layer) => {
            const p = feature.properties as any;
            if (index < 55) {
              layer.bindPopup(
                '<h4>' + vote_winner[index].candidate.name + '</h4>' +
                '<hr>' +
                '<b>lieu</b>: ' + vote_winner[index].bureau.name as any +
                '<br>' +
                '<b>pourcentages</b>: ' + vote_winner[index].candidate.percentage + '%' +
                '<br>' +
                '<b>votes</b>: ' + vote_winner[index].candidate.votes as any
              );
              index++;
            }
          },
        }).addTo(this.map);
      });
    });
  }
}
