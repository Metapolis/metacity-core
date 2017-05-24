import { Component } from "@angular/core";
import { Assets } from "../../assets";

@Component({
  selector: "app-dbaccident",
  templateUrl: "./dbaccident.component.html",
  styleUrls: ["./dbaccident.component.scss", "../dashboard.component.scss"]
})
export class DbaccidentComponent {
  private assets = new Assets();
}
