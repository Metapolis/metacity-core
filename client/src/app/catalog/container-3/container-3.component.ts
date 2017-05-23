import { Component, OnInit } from "@angular/core";
import { BlockContent } from "./block-content";
import { Router, NavigationEnd } from "@angular/router";
import { Assets } from "../../assets";

@Component({
  selector: "catalog-container-3",
  templateUrl: "./container-3.component.html",
  styleUrls: ["../catalog.component.scss"]
})
export class Container3Component implements OnInit {
  assets = new Assets;
  blocks: BlockContent[] = [
    {
      title: "OPEN SOURCE",
      text: `MetaCity est un outil open source de gestion de données « smart »
      des territoires. La plateforme doit contribuer à faire émerger une
      communauté d’utilisateurs (villes, citoyens,entreprises privées )
      et agir comme un  « tiers de confiance » pour favoriser la transparence
      et les échanges entre chacun.`
    },
    {
      title: "INNOVANTE",
      text: `MetaCity est un outil open source de gestion de données « smart »
      des territoires. La plateforme doit contribuer à faire émerger une
      communauté d’utilisateurs (villes, citoyens,entreprises privées ) et agir
      comme un  « tiers de confiance » pour favoriser la transparence et les
      échanges entre chacun.`
    },
    {
      title: "ÉVOLUTIVE",
      text: `MetaCity est un outil open source de gestion de données « smart »
      des territoires. La plateforme doit contribuer à faire émerger une
      communauté d’utilisateurs (villes, citoyens,entreprises privées ) et agir
      comme un  « tiers de confiance » pour favoriser la transparence et les
      échanges entre chacun.`
    }
  ];
  constructor(private _router: Router) { }

  public ngOnInit() {
    this._router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        (<any>window).twttr = (function(d, s, id) {
          const fjs = d.getElementsByTagName(s)[0];
            const t = (<any>window).twttr || {};
          if (d.getElementById(id)) {
            return t;
          }
          let js: any;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function(f: any) {
            t._e.push(f);
          };

          return t;
        }(document, "script", "twitter-wjs"));
      }
    });
  }

}
