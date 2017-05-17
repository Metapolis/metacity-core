import * as d3 from 'd3';

export class MapSpecific {
  onMapReady(map: L.Map) {
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };
    d3.json('assets/mock-data/accidents.json', (err, data) => {

      const pdata = data as {id:number, location: {address: string, lat_lon: L.LatLngExpression}}[];

      pdata.forEach((item, index, array) => {
          const lat_lon = [item.location.lat_lon[0] / 100000, item.location.lat_lon[1] / 100000] as L.LatLngExpression;
          L.marker(lat_lon, icon).addTo(map);
      });
    });
  }
}
