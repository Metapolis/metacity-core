import { Component } from "@angular/core";
import { Link } from "../common/link";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
  private footerlinks: Link[] = [
    { src: "https://www.metapolis.fr", text: "Metapolis" },
    { src: "contact", text: "Contact" },
    { src: "faq", text: "FAQ" },
    { src: "cgu", text: "CGU" },
    { src: "mentions-legales", text: "Mentions legales" }
  ];
}
