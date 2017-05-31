import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";
import { Dataset } from "../../common/dataset";
import { Card } from "../../common/card";
import { MOCK_ACCIDENT_DATASET } from "../shared/mock-dashboard-datasets/mock-accident-dataset";

@Component({
  selector: "app-dbaccident",
  templateUrl: "./dbaccident.component.html",
  styleUrls: ["./dbaccident.component.scss", "../dashboard.component.scss"]
})
export class DbaccidentComponent {
  private datasets;
  private cardMap: Card;
  private cardGraph: Card;
  constructor(private assets: AssetService) {
    this.datasets = MOCK_ACCIDENT_DATASET;
    this.cardMap = { title: "La carte", link: { src: "/overview/accidents/carte", text: "Intéragir avec la carte" } };
    this.cardGraph = { title: "Les analyses", link: { src: "/overview/accidents/analyse", text: "Visualiser toutes les analyses" } };
  }
}
