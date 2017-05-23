import { Injectable } from "@angular/core";

@Injectable()
export class ConnexionService {
  connexionState: boolean = true;
  getConnexionState(): Promise<boolean> {
    return Promise.resolve(this.connexionState);
  }
}
