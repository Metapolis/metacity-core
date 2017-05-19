import * as d3 from 'd3';

export class ElectionMapSpecific {

  option: L.GeoJSONOptions;

  onMapReady(map: L.Map) {
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };


    d3.json('assets/mock-data/electoral_bureau_vote_4326.geojson', (err, data) => {
      const featureCollection = data as any;

      L.geoJSON(featureCollection, {
        onEachFeature: (feature, layer) => {
          // console.log(feature.properties);
          const p = feature.properties as any;
          layer.bindPopup(p.ebc_nom as any);
        }
      }).addTo(map);
    });

    d3.json('assets/mock-data/vote_winner.json', (err, data) => {
      console.log(data);
    });
  }
}
