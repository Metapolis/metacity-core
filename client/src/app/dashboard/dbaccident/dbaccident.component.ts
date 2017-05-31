import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";
import { Dataset } from "../../common/dataset";
import { MOCK_ACCIDENT_DATASET } from "../shared/mock-dashboard-datasets/mock-accident-dataset";

@Component({
  selector: "app-dbaccident",
  templateUrl: "./dbaccident.component.html",
  styleUrls: ["./dbaccident.component.scss", "../dashboard.component.scss"]
})
export class DbaccidentComponent {
  private datasets;
  constructor(private assets: AssetService) {
    this.datasets = MOCK_ACCIDENT_DATASET;
  }
}
