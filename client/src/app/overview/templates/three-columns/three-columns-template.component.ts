import { Component } from '@angular/core';
import { Assets } from '../../../assets';
import { Link } from '../../../common/link';
import { Img } from '../../../common/img';

@Component({
  selector: "overview-template-three-columns",
  templateUrl: 'three-columns-template.component.html',
  styleUrls: ['three-columns-template.component.scss']
})
export class ThreeColumnsTemplateComponent {
  assets = new Assets;
  visuallinks: { link: Link, img: Img }[] = [
    {
      link: { src: '404', text: 'Dashboard' },
      img: { src: this.assets.home.src, alt: this.assets.home.alt }
    },
    {
      link: { src: '404', text: 'Intégrer' },
      img: { src: this.assets.code.src, alt: this.assets.code.alt }
    },
    {
      link: { src: '404', text: 'Rechercher' },
      img: { src: this.assets.search.src, alt: this.assets.search.alt }
    },
    {
      link: { src: '404', text: 'Carte' },
      img: { src: this.assets.worldwide.src, alt: this.assets.worldwide.alt }
    },
  ];
}
