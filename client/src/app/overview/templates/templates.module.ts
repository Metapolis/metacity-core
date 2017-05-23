// Modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Components
import { ThreeColumnsTemplateComponent } from "./three-columns/three-columns-template.component";

// Services

@NgModule({
  imports: [],
  declarations: [
    ThreeColumnsTemplateComponent
  ],
  providers: [],
  exports: [
    ThreeColumnsTemplateComponent
  ]
})
export class TemplatesModule { }
