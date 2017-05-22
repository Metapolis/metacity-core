import * as d3 from 'd3';

export class ElectionMapSpecific {

  option: L.GeoJSONOptions;
  winner: string;
  bureau: string;
  colors: {
    [candidate: string]: string
  };

  constructor(winner: string, bureau: string, colors: {[candidate: string]: string}) {
    this.winner = winner;
    this.bureau = bureau;
    this.colors = colors;
  }


  onMapReady(map: L.Map) {
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };

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
