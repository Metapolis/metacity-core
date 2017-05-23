// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

// Components
import { MapComponent } from './map.component';

// Services

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LeafletModule,
  ],
  declarations: [
    MapComponent,
  ],
  exports: [
    MapComponent,
  ]
})
export class MapModule { }
export class MyModule { }
