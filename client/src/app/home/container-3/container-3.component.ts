import { Component } from "@angular/core";
import { BlockContent } from "./block-content";

@Component({
  selector: "app-container-3",
  templateUrl: "./container-3.component.html",
  styleUrls: ["../home.component.scss"],
})
export class Container3Component {
  blocks: BlockContent[] = [
    {
      title: "OPEN SOURCE",
      text: `MetaCity est un outil open
source de gestion de
données « smart » des
territoires.La plateforme
doit contribuer à faire
émerger une
communauté d’utilisateurs
  (villes, citoyens, entreprises
privées ) et agir comme un
« tiers de confiance » pour
favoriser la transparence
et les échanges entre
chacun.
`
    },
    {
      title: "INNOVANTE",
      text: `A travers l’ouverture et
l’accès à plusieurs jeux de
données, la plateforme
MetaCity constitue un outil
d’information et de
transparence innovant, et
permet de contribuer à
l’open innovation en
favorisant la ré - utilisation
des données urbaines. Il
s’agit également de
favoriser l’adoption de
standards de données et
d’échanges permettant la
généralisation de
nouveaux services urbains.
`
    },
    {
      title: "ÉVOLUTIVE",
  text: `La plateforme est pensée pour s’adapter
      aux évolutions des usages de la donnée urbaine,
       et anticiper l’ouverture croissante des flux de données
        issues des collectivités, des opérateurs et du
        développement de nouvelles pratiques telles
         que le crowdsourcing.

`
    }
  ];
}
