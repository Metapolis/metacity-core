import { Component, Input } from "@angular/core";
import { LinkInterface } from "../../../common/link";

@Component({
  selector: "app-filter-view-switcher",
  templateUrl: "./filter-view-switcher.component.html",
  styleUrls: ["./filter-view-switcher.component.scss", "../generique-filters.component.scss"]
})
export class FilterViewSwitcherComponent {

  @Input()
  public links: LinkInterface[];

  constructor() {
    this.links = [{
      src: "#",
      text: ""
    }];
  }

}
