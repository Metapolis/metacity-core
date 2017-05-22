import * as d3 from 'd3';
import { MapSpecific } from './map-specific';

export class ElectionMapSpecific implements MapSpecific {

  option: L.GeoJSONOptions;

  onMapReady(map: L.Map) {
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };

    d3.json('assets/mock-data/vote_winner.json', (err, vote_winner) => {
      let index = 0;

      d3.json('assets/mock-data/electoral_bureau_vote_4326.geojson', (err2, data) => {
        const featureCollection = data as any;

        L.geoJSON(featureCollection, {
          style: (feature) => {
            if (index < 55) {
              switch (vote_winner[index].candidate.name) {
                case 'Hollande':
                  return { color: '#f10d47' };
                case 'Sarkozy':
                  return { color: '#0080c5' };
                default:
                  return { color: '#6b848c' };
              }
            }
          },
          onEachFeature: (feature, layer) => {
            // console.log(feature.properties);
            const p = feature.properties as any;
            if (index < 55) {
              layer.bindPopup(
                '<h4>' + vote_winner[index].candidate.name + '</h4>' +
                '<hr>' +
                // '<b>lieu</b>: ' + vote_winner[index].bureau.name as any +
                '<br>' +
                '<b>pourcentages</b>: ' + vote_winner[index].candidate.percentage + '%' +
                '<br>' +
                '<b>votes</b>: ' + vote_winner[index].candidate.votes as any +
                ''
              );
              index++;
            }
          },
        }).addTo(map);
      });
    });
  }
}
