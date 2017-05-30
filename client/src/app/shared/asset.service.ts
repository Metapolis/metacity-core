import { Injectable } from "@angular/core";
import { LocationService } from "./location.service";
import { Img } from "../common/img";

@Injectable()
export class AssetService {

  public whiteLogo: Img = { src: "../assets/img/metaCityBlanc.svg", alt: "metacity small logo" };
  public homeIcon: Img = { src: "../assets/img/home.svg", alt: "Home icon" };
  public metacityLogo: Img = { src: "../assets/img/metaCity.svg", alt: "metacity logo" };
  public thematiques: Img = { src: "../assets/img/thematiquesimg.jpg", alt: "metacity logo" };
  public accidentsCarte: Img = { src: "../assets/img/accidents_carte.png", alt: "accidents map" };
  public victimes: Img = { src: "../assets/img/victimes.png", alt: "victimes" };
  public wordCloud: Img = { src: "../assets/img/wordcloud.svg", alt: "word cloud " };
  public presidentMap: Img = { src: "../assets/img/president_map.png", alt: "" };
  public presidentGraph: Img = { src: "../assets/img/president_graph.png", alt: "" };
  public legendGraph: Img = { src: "../assets/img/legend_graph.png", alt: "" };
  public home: Img = { src: "../assets/img/home.svg", alt: "" };
  public code: Img = { src: "../assets/img/code.svg", alt: "" };
  public search: Img = { src: "../assets/img/search.svg", alt: "" };
  public worldwide: Img = { src: "../assets/img/worldwide.svg", alt: "" };
  public world: Img = { src: "../assets/img/monde.png", alt: "image statique Monde" };

  constructor(private locationService: LocationService) { }

  public locationLogo(): Img {
    return {
      src: "../assets/img/logo_" + this.locationService.getCurrentLocationKey().toLowerCase() + ".png",
      alt: "logo de " + this.locationService.getCurrentLocationKey().toLowerCase()
    };
  }
}
