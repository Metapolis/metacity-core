import { Component } from '@angular/core';
import { Assets }    from '../assets';
import { Link }      from '../common/link';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  assets = new Assets;
  navlinks: Link[] = [
    // { src: 'sources-et-applications', text: 'Sources et Applications' },
    // { src: 'nos-services', text: 'Nos services' },
    // { src: 'developpeurs', text: 'Développeurs' },
    // { src: 'contact', text: 'Contact' },
    // { src: 'mon-compte', text: 'Mon Compte' },
    { src: 'accidents', text: 'Accidents' },
    { src: 'elections', text: 'Elections' },
    { src: 'register', text: 'Inscription' },
    { src: 'connexion', text: 'Connexion' },
  ];

  public isCollapsed = true;
}
