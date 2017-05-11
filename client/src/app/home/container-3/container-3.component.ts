import { Component } from '@angular/core';
import { BlockContent } from './block-content';

@Component({
  selector: 'container-3',
  templateUrl: './container-3.component.html',
})
export class Container3Component {
  blocks: BlockContent[] = [
    {
      title: "OPEN SOURCE",
      text: "MetaCity est un outil open source de gestion de données « smart » des territoires. La plateforme doit contribuer à faire émerger une communauté d’utilisateurs (villes, citoyens,entreprises privées ) et agir comme un  « tiers de confiance » pour favoriser la transparence et les échanges entre chacun."
    },
    {
      title: "INNOVANTE",
      text: "MetaCity est un outil open source de gestion de données « smart » des territoires. La plateforme doit contribuer à faire émerger une communauté d’utilisateurs (villes, citoyens,entreprises privées ) et agir comme un  « tiers de confiance » pour favoriser la transparence et les échanges entre chacun."
    },
    {
      title: "ÉVOLUTIVE",
      text: "MetaCity est un outil open source de gestion de données « smart » des territoires. La plateforme doit contribuer à faire émerger une communauté d’utilisateurs (villes, citoyens,entreprises privées ) et agir comme un  « tiers de confiance » pour favoriser la transparence et les échanges entre chacun."
    }
  ]
}
