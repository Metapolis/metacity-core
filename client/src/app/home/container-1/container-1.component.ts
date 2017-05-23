import { Component } from "@angular/core";
import { Assets } from "../../assets";

@Component({
  selector: "app-container-1",
  templateUrl: "./container-1.component.html",
  styleUrls: ["../home.component.scss"],
})
export class Container1Component {
  assets = new Assets;
  text = `MetaCity est une plateforme de collecte et d’échanges de données
multi-domaines favorisant l’analyse, la visualisation et l’aide au pilotage
des services et réseaux urbains. Cette plateforme est mise à
disposition de tous les acteurs du territoire : citoyens, décideurs et
opérateurs. En hébergeant et en fluidifiant la mise en commun des
données nécessaires au fonctionnement des services de la ville, la
plateforme MetaCity permet de partager la gouvernance territoriale et
de faciliter l’implémentation et l’opération des services urbains, tout en
plaçant le citoyen au coeur de la démarche smart city.
`;
}
