import { Component, OnInit } from "@angular/core";
import { Assets } from "../../assets";

@Component({
  selector: "app-dbelection",
  templateUrl: "./dbelection.component.html",
  styleUrls: ["./dbelection.component.scss", "../dashboard.component.scss"]
})
export class DbelectionComponent implements OnInit {
  assets = new Assets;

  constructor() { }

  ngOnInit() {
  }

}
