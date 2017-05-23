import * as d3 from 'd3';
import { MapSpecific } from './map-specific';

export class ElectionMapSpecific implements MapSpecific {

  option: L.GeoJSONOptions;
  electionDataPath: string;
  pollingStationPath: string;
  electionCandidateColors: {
    [candidate: string]: string
  } = {};
  electionCandidateColorPath: string;
  map: L.Map;

  constructor() {
    this.electionCandidateColors['Hollande'] = '#f10d47';
    this.electionCandidateColors['Sarkozy'] = '#0080c5';
  }

  setData(pollingStationPath: string, electionDataPath: string, electionCandidateColorPath: string) {
    this.pollingStationPath = pollingStationPath;
    this.electionDataPath = electionDataPath;
    this.electionCandidateColorPath = electionCandidateColorPath;
  }

  onMapReady(map: L.Map) {
    this.map = map;
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };
  }
  draw () {
    d3.json(this.electionDataPath, (err, electionData) => {
      let index = 0;

      d3.json(this.pollingStationPath, (err2, fc) => {
        const featureCollection = fc as any;

        L.geoJSON(featureCollection, {
          style: (feature) => {
            if (index < 55) {
              return { color: this.electionCandidateColors[electionData[index].candidate.name] };
            }
          },
          onEachFeature: (feature, layer) => {
            const p = feature.properties as any;
            if (index < 55) {
              layer.bindPopup(
                '<h4>' + electionData[index].candidate.name + '</h4>' +
                '<hr>' +
                '<b>lieu</b>: ' + electionData[index].bureau.name as any +
                '<br>' +
                '<b>pourcentages</b>: ' + electionData[index].candidate.percentage + '%' +
                '<br>' +
                '<b>votes</b>: ' + electionData[index].candidate.votes as any
              );
              index++;
            }
          },
        }).addTo(this.map);
      });
    });
  }
}
