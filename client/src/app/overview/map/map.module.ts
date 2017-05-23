// Modules
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

// Components
import { MapComponent } from './map.component';

// Services

@NgModule({
  imports: [
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
