import { Component } from "@angular/core";
import { Assets } from "../../assets";

@Component({
  selector: "app-dbelection",
  templateUrl: "./dbelection.component.html",
  styleUrls: ["./dbelection.component.scss", "../dashboard.component.scss"]
})
export class DbelectionComponent {
  private assets = new Assets();
}
