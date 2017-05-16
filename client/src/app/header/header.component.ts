import { Component } from '@angular/core';
import { Assets }    from '../assets';
import { Link }      from '../common/link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  assets = new Assets;
  navlinks: Link[] = [
    // { src: 'sources-et-applications', text: 'Sources et Applications' },
    // { src: 'nos-services', text: 'Nos services' },
    // { src: 'developpeurs', text: 'Développeurs' },
    // { src: 'contact', text: 'Contact' },
    // { src: 'mon-compte', text: 'Mon Compte' },
    { src: 'accidents/analyse', text: 'Accident/analyse' },
    { src: 'accidents/carte', text: 'Accident/carte'},
    { src: 'accidents', text: 'Accidents' },
    { src: 'elections', text: 'Elections' },
    { src: 'register', text: 'Inscription' },
    { src: 'connexion', text: 'Connexion' },
  ];

  public isCollapsed = true;
}
