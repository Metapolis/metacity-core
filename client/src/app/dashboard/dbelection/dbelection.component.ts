import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";
import { Dataset } from "../../common/dataset";
import { Card } from "../../common/card";
import { MOCK_ELECTION_DATASET } from "../shared/mock-dashboard-datasets/mock-election-dataset";

@Component({
  selector: "app-dbelection",
  templateUrl: "./dbelection.component.html",
  styleUrls: ["./dbelection.component.scss", "../dashboard.component.scss"]
})
export class DbelectionComponent {
  private datasets;
  private cardMap: Card;
  private cardGraph: Card;
  constructor(private assets: AssetService) {
    this.datasets = MOCK_ELECTION_DATASET;
    this.cardMap = { title: "La carte", link: { src: "/overview/elections/carte", text: "Intéragir avec la carte" } };
    this.cardGraph = { title: "Les analyses", link: { src: "/overview/elections/analyse", text: "Visualiser toutes les analyses" } };
  }
}
