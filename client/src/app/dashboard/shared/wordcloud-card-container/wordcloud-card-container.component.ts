import { Component, OnInit } from "@angular/core";
import { AssetService } from "../../../shared/asset.service";

@Component({
  selector: "app-wordcloud-card-container",
  templateUrl: "./wordcloud-card-container.component.html",
  styleUrls: ["./wordcloud-card-container.component.scss", "../../dashboard.component.scss"]
})
export class WordcloudCardContainerComponent {

  constructor(private assets: AssetService) {}

}
