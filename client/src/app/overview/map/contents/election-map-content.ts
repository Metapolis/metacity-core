import * as d3 from 'd3';

export class ElectionMapSpecific {
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

      console.log(featureCollection);

      const layer = new L.GeoJSON(featureCollection);
      map.addLayer(layer);
    });
  }
}
