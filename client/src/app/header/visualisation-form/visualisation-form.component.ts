import { Component } from "@angular/core";
import { Link } from "../../common/link";

@Component({
  selector: "app-visualisation-form",
  templateUrl: "./visualisation-form.component.html",
  styleUrls: ["../header.component.scss"],
})
export class VisualisationFormComponent  {
  private searchLink: Link = {src: "catalog", text: "Voir toutes les visualisations de données"};
}
