import { Component } from "@angular/core";
import { LinkInterface } from "../../../../common/link";

@Component({
  selector: "app-accident-view-switcher",
  templateUrl: "./accident-view-switcher.component.html",
  styleUrls: ["./accident-view-switcher.component.scss"]
})
export class AccidentViewSwitcherComponent {

  private links: LinkInterface[];

  constructor() {
    this.links = [
      {
        src: "/overview/accidents/carte",
        text: "La carte"
      },
      {
        src: "/overview/accidents/analyse",
        text: "Les analyses"
      }
    ];
  }

}
