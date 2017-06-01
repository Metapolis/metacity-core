import { Component, Input } from "@angular/core";
import { Dataset } from "../../../common/dataset";

@Component({
  selector: "app-used-data",
  templateUrl: "./used-data.component.html",
  styleUrls: ["./used-data.component.scss", "../../dashboard.component.scss"]
})
export class UsedDataComponent {

  @Input()
  public datasets: Dataset[];

  @Input()
  public theme: string;

  constructor() {
    this.theme = "block_jdd_row";
    this.datasets = [{ title: "", content: "" }];
  }

}
