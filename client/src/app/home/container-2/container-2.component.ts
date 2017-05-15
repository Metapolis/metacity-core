import { Component } from '@angular/core';
import { Assets }    from '../../assets';
import { Link }      from '../../common/link';

@Component({
  selector: 'container-2',
  templateUrl: './container-2.component.html',
  styleUrls: ['../home.component.scss'],
})
export class Container2Component {
  assets = new Assets;
  thematiqueslinks1 : Link[] = [
    { src: '#', text: 'Accessibilité'},
    { src: '#', text: 'Urbanisme'},
    { src: '#', text: 'Territoire'},
    { src: '#', text: 'Citoyenneté'},
    { src: '#', text: 'Économie'},
    { src: '#', text: 'Éducation & Jeunesse'},
  ];
  thematiqueslinks2 : Link[] = [
    { src: '#', text: 'Environnement'},
    { src: '#', text: 'Sports & Loisirs'},
    { src: '#', text: 'Santé'},
    { src: '#', text: 'Sécurité'},
    { src: '#', text: 'Mobilité'},
    { src: '#', text: 'Culture & Tourisme'},
  ];

}
