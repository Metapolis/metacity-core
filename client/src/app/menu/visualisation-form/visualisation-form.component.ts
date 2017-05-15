import { Component } from '@angular/core';
import { Link }      from '../../common/link';

@Component({
  selector: 'visualisation-form',
  templateUrl: './visualisation-form.component.html',
})
export class VisualisationFormComponent  {
  searchLink: Link = { src: 'catalog', text: 'Voir toutes les visualisations de données' };
}
