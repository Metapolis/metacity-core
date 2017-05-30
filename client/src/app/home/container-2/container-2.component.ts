import { Component } from "@angular/core";
import { AssetService } from "../../shared/asset.service";
import { Link } from "../../common/link";

@Component({
  selector: "app-container-2",
  templateUrl: "./container-2.component.html",
  styleUrls: ["../home.component.scss"],
})
export class Container2Component {
  private thematiqueslinks1: Link[] = [
    {src: "/", text: "Accessibilité"},
    {src: "/", text: "Urbanisme"},
    {src: "/", text: "Territoire"},
    {src: "/", text: "Citoyenneté"},
    {src: "/", text: "Économie"},
    {src: "/", text: "Éducation & Jeunesse"},
  ];
  private thematiqueslinks2: Link[] = [
    {src: "/", text: "Environnement"},
    {src: "/", text: "Sports & Loisirs"},
    {src: "/", text: "Santé"},
    {src: "/", text: "Sécurité"},
    {src: "/", text: "Mobilité"},
    {src: "/", text: "Culture & Tourisme"},
  ];
  constructor(private assets: AssetService) {}

}
