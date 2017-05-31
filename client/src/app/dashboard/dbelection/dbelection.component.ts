import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";
import { Dataset } from "../../common/dataset";
import { MOCK_ELECTION_DATASET } from "../shared/mock-dashboard-datasets/mock-election-dataset";

@Component({
  selector: "app-dbelection",
  templateUrl: "./dbelection.component.html",
  styleUrls: ["./dbelection.component.scss", "../dashboard.component.scss"]
})
export class DbelectionComponent {
  private datasets;
  constructor(private assets: AssetService) {
    this.datasets = MOCK_ELECTION_DATASET;
  }
}
