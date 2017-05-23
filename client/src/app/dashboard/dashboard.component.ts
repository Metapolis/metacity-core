import { Component, OnInit } from "@angular/core";
import { Assets } from "../assets";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  assets = new Assets;

  constructor() { }

  ngOnInit() {
  }

}
