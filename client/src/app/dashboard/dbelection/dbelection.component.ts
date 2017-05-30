import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";

@Component({
  selector: "app-dbelection",
  templateUrl: "./dbelection.component.html",
  styleUrls: ["./dbelection.component.scss", "../dashboard.component.scss"]
})
export class DbelectionComponent {
  constructor(private assets: AssetService) {}
}
