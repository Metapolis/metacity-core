// Modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Ng2SelectModule } from "ng2-material-select";
import { MaterialModule, MdButtonModule, MdCheckboxModule } from "@angular/material";

// Components
import { AccidentMapFiltersComponent } from "./accidents/accident-map-filters/accident-map-filters.component";
import { AccidentChartFiltersComponent } from "./accidents/accident-chart-filters/accident-chart-filters.component";
import { ElectionMapFiltersComponent } from "./elections/election-map-filters/election-map-filters.component";
import { ElectionChartFiltersComponent } from "./elections/election-chart-filters/election-chart-filters.component";

// Services

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SelectModule,
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  declarations: [
    AccidentMapFiltersComponent,
    AccidentChartFiltersComponent,
    ElectionChartFiltersComponent,
    ElectionMapFiltersComponent
  ],
  providers: [],
  exports: [
    AccidentMapFiltersComponent,
    AccidentChartFiltersComponent,
    ElectionChartFiltersComponent,
    ElectionMapFiltersComponent
  ]
})
export class FiltersModule { }
