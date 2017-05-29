import * as d3 from "d3-request";
import { MapSpecific } from "./map-specific";

const MAX_POLLING: number = 55;

export class ElectionMapSpecific implements MapSpecific {

  private option: L.GeoJSONOptions;
  private electionDataPath: string;
  private pollingStationPath: string;
  private electionCandidateColors: {
    [candidate: string]: string
  } = {};
  private electionCandidateColorPath: string;
  private map: L.Map;

  constructor() {
    this.electionCandidateColors["Hollande"] = "#f10d47";
    this.electionCandidateColors["Sarkozy"] = "#0080c5";
  }

  public setData(pollingStationPath: string, electionDataPath: string, electionCandidateColorPath: string) {
    this.pollingStationPath = pollingStationPath;
    this.electionDataPath = electionDataPath;
    this.electionCandidateColorPath = electionCandidateColorPath;
  }

  public onMapReady(map: L.Map) {
    this.map = map;
  }

  public draw() {
    d3.json(this.electionDataPath, (err, electionData) => {
      let index = 0;

      d3.json(this.pollingStationPath, (err2, fc) => {
        const featureCollection = fc as any;

        L.geoJSON(featureCollection, {
          style: (feature) => {
            if (index < MAX_POLLING) {
              return { color: this.electionCandidateColors[electionData[index].candidate.name] };
            }
          },
          onEachFeature: (feature, layer) => {
            const p = feature.properties as any;
            if (index < MAX_POLLING) {
              layer.bindPopup(
                "<h4>" + electionData[index].candidate.name + "</h4>" +
                "<hr>" +
                "<b>lieu</b>: " + electionData[index].bureau.name +
                "<br>" +
                "<b>pourcentages</b>: " + electionData[index].candidate.percentage + "%" +
                "<br>" +
                "<b>votes</b>: " + electionData[index].candidate.votes
              );
              index++;
            }
          },
        }).addTo(this.map);
      });
    });
  }
}
