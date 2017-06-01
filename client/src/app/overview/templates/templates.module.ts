// Modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Components
import { ThreeColumnsTemplateComponent } from "./three-columns/three-columns-template.component";
import { TwoColumsComponent } from "./two-colums/two-colums.component";

// Services

@NgModule({
  imports: [],
  declarations: [
    ThreeColumnsTemplateComponent,
    TwoColumsComponent
  ],
  providers: [],
  exports: [
    ThreeColumnsTemplateComponent,
    TwoColumsComponent
  ]
})
export class TemplatesModule { }
