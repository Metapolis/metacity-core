import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";

@Component({
  selector: "app-dbaccident",
  templateUrl: "./dbaccident.component.html",
  styleUrls: ["./dbaccident.component.scss", "../dashboard.component.scss"]
})
export class DbaccidentComponent {
  constructor(private assets: AssetService) {}
}
