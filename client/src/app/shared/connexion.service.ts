import { Injectable } from "@angular/core";

@Injectable()
export class ConnexionService {
  private connexionState: boolean = true;
  public getConnexionState(): Promise<boolean> {
    return Promise.resolve(this.connexionState);
  }
}
