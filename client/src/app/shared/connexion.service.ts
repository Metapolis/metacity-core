import { Injectable } from '@angular/core';

@Injectable()
export class ConnexionService {
  connexionState: boolean = false;
  getConnexionState(): Promise<boolean> {
    return Promise.resolve(this.connexionState);
  }
}
