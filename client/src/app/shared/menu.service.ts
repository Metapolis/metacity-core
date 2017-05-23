import { Injectable } from "@angular/core";

import { Link } from "./../common/link";
import { OFFLINENAVLINKS } from "./mock-navlinks/offline-mock-navlinks";
import { ONLINENAVLINKS } from "./mock-navlinks/online-mock-navlinks";
import { ConnexionService } from "./connexion.service";

@Injectable()
export class MenuService {
  connexionState: boolean;

  constructor(private connexionService: ConnexionService) { }

  async getHeaderNavlinks(): Promise<Link[]> {
    await this.getConnexionState();
    if (!this.connexionState) {
      return Promise.resolve(OFFLINENAVLINKS);
    }
    if (this.connexionState) {
      return Promise.resolve(ONLINENAVLINKS);
    }
  }

  private async getConnexionState() {
    this.connexionState = await this.connexionService.getConnexionState();
  }
}
