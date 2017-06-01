import { Component } from "@angular/core";
import { LinkInterface } from "../../../../common/link";

@Component({
  selector: "app-election-view-switcher",
  templateUrl: "./election-view-switcher.component.html",
  styleUrls: ["./election-view-switcher.component.scss"]
})
export class ElectionViewSwitcherComponent {

  private links: LinkInterface[];

  constructor() {
    this.links = [
      {
        src: "/overview/elections/carte",
        text: "La carte"
      },
      {
        src: "/overview/elections/analyse",
        text: "Les analyses"
      }
    ];
  }

}
