import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";

@Component({
  selector: "catalog-container-1",
  templateUrl: "./container-1.component.html",
  styleUrls: ["../catalog.component.scss"]
})
export class Container1Component {
  constructor(private assets: AssetService) {}
}
