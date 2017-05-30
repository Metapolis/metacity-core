import { Component } from "@angular/core";
import "hammerjs";

import { MapContentService } from "../../../shared/map-content.service";
import { LocationService } from "../../../../shared/location.service";

@Component({
  selector: "overview-election-map-filters",
  templateUrl: "./election-map-filters.component.html",
  styleUrls: ["./election-map-filters.component.html", "../../generique-filters.component.scss"]
})
export class ElectionMapFiltersComponent {

  private current_election_layer;

  private buttonListElections: Array<{ label: string, value: string }> = [
    {label: "Résultats du 1er tour 2012", value: "election-2012/1"},
    {label: "Résultats du 2nd tour 2012", value: "election-2012/2"},
    {label: "Résultats du 1er tour 2017", value: "election-2017/1"},
    {label: "Résultats du 2nd tour 2017", value: "election-2017/2"},
  ];

  constructor(private mapcontentservice: MapContentService, private locationService: LocationService) { }

  public goTo(selected: string) {
    if (selected !== this.current_election_layer) {
      this.setCurrentElectionLayer(selected);
      this.setRoundFilterService();
    }
  }

  public setCurrentElectionLayer(selected: string) {
    this.current_election_layer = selected;
  }

  public setRoundFilterService() {
    this.mapcontentservice.electionMapControl.setRoundFilter(this.current_election_layer);
  }
}
