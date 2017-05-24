import { Component } from "@angular/core";
import { Assets } from "../assets";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  private assets = new Assets();
}
