// Modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Components
import { ThreeColumnsTemplateComponent } from "./three-columns/three-columns-template.component";
import { TwoColumnsTemplateComponent } from "./two-columns/two-columns-template.component";

// Services

@NgModule({
  imports: [],
  declarations: [
    ThreeColumnsTemplateComponent,
    TwoColumnsTemplateComponent
  ],
  providers: [],
  exports: [
    ThreeColumnsTemplateComponent,
    TwoColumnsTemplateComponent
  ]
})
export class TemplatesModule { }
