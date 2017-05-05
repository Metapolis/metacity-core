import { Component } from '@angular/core';
import { Assets }    from '../assets';
import { Link }      from '../common/link';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls : ['./menu.component.css'],
})
export class MenuComponent  {
  assets = new Assets;
  navlinks : Link[] = [
    {src: "sources-et-applications", text:"Sources et Applications"},
    {src: "nos-services", text:"Nos services"},
    {src: "developpeurs", text:"Développeurs"},
    {src: "contact", text:"Contact"},
    {src: "mon-compte", text:"Mon Compte"},
    {src: "connexion", text:"Connexion"},
  ];
}
