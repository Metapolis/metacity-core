import { Component, Input } from "@angular/core";
import { Card } from "../../../common/card";

@Component({
  selector: "app-dashboard-card-container",
  templateUrl: "./dashboard-card-container.component.html",
  styleUrls: ["./dashboard-card-container.component.scss", "../../dashboard.component.scss"]
})
export class DashboardCardContainerComponent {

  @Input()
  public card: Card;

  constructor() {
    this.card = { title: "", link: { src: "", text: "" } };
  }

}
