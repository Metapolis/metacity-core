import { Component } from "@angular/core";
import { AssetService } from "../shared/asset.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  constructor(private assets: AssetService) {}
}
