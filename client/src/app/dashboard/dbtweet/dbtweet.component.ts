import { Component, OnInit } from "@angular/core";
import { Dataset } from "../../common/dataset";
import { MOCK_TWEET_DATASET } from "../shared/mock-dashboard-datasets/mock-tweet-dataset";

@Component({
  selector: "app-dbtweet",
  templateUrl: "./dbtweet.component.html",
  styleUrls: ["./dbtweet.component.scss", "../dashboard.component.scss"]
})
export class DbtweetComponent {

  private datasets;
  constructor() {
    this.datasets = MOCK_TWEET_DATASET;
  }

}
