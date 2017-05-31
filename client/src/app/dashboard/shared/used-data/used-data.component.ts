import { Component, OnInit } from "@angular/core";

interface Dataset {
  title: string;
  content: string;
}

@Component({
  selector: "app-used-data",
  templateUrl: "./used-data.component.html",
  styleUrls: ["./used-data.component.scss", "../../dashboard.component.scss"]
})
export class UsedDataComponent {

  private datasets: Dataset[];

  constructor() {
    this.datasets = new Array<Dataset>(
      {
        title: "AGENDA DES MANIFESTATIONS CULTURELLES",
        content: "Modifié il y a 2 jours <br>1120 téléchargements <br>Culture"
      },
      {
        title: "AGENDA DES MANIFESTATIONS CULTURELLES",
        content: "Modifié il y a 2 jours <br>1120 téléchargements <br>Culture"
      },
      {
        title: "AGENDA DES MANIFESTATIONS CULTURELLES",
        content: "Modifié il y a 2 jours <br>1120 téléchargements <br>Culture"
      },
      {
        title: "AGENDA DES MANIFESTATIONS CULTURELLES",
        content: "Modifié il y a 2 jours <br>1120 téléchargements <br>Culture"
      },
      {
        title: "AGENDA DES MANIFESTATIONS CULTURELLES",
        content: "Modifié il y a 2 jours <br>1120 téléchargements <br>Culture"
      },
      {
        title: "AGENDA DES MANIFESTATIONS CULTURELLES",
        content: "Modifié il y a 2 jours <br>1120 téléchargements <br>Culture"
      }
    );
  }

}
