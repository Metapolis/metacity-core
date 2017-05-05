import * as d3 from 'd3'
import * as L from 'leaflet'

export module geo {
  /**
   * Create a Map on a Svg element using leaflet
   * @return {[type]} [description]
   */
  export class Map {

    constructor() {
    }

    public draw(): void {
      console.log("Drawing map in progress...");

      var mapdiv = document.createElement('div');
      mapdiv.id = 'map';
      document.body.appendChild(mapdiv);

      var map = new L.Map("map");
map.setView(new L.LatLng(51.505, -0.09), 13);

var OpenStreetMap_DE = new L.TileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

OpenStreetMap_DE.addTo(map);

// add marker
var marker = new L.Marker(new L.LatLng(51.5, -0.09));
marker.addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

// add circle
var circle = new L.Circle(new L.LatLng(51.508, -0.11), 500, {
  		color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle.");

// add polygon
var latlongs : L.LatLng[];
latlongs= [
    new L.LatLng(51.509, -0.08),
    new L.LatLng(51.503, -0.06),
    new L.LatLng(51.51, -0.047)
];
var polygon = new L.Polygon(latlongs).addTo(map).bindPopup("I am a polygon.");

// popup on mapclick
var popup = new L.Popup();

    }
  }
}
