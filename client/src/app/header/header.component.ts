import { Component, OnInit } from '@angular/core';

import { Assets }    from '../assets';
import { Link }      from '../common/link';
import { MenuService } from '../shared/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.getMenu();
  }
  navlinks: Link[];
  assets = new Assets;

  getMenu(): void {
    this.menuService.getHeaderNavlinks().then(answer => this.navlinks = answer);
  }

  public isCollapsed = true;
}
