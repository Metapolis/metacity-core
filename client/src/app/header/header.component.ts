import { Component, OnInit } from "@angular/core";

import { AssetService } from "../shared/asset.service";
import { Link } from "../common/link";
import { MenuService } from "../shared/menu.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private navlinks: Link[];
  public isCollapsed = true;

  constructor(private menuService: MenuService, private assets: AssetService) {}

  public ngOnInit(): void {
    this.getMenu();
  }

  private async getMenu(): Promise<void> {
    this.navlinks = await this.menuService.getHeaderNavlinks();
  }
}
