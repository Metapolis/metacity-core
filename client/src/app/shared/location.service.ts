import { Injectable } from "@angular/core";

@Injectable()
export class LocationService {

  private list: string[];

  constructor() {
    this.list = new Array<string>();
  }

  public getList(): string[] {
    return this.list;
  }

  public setList(list: string[]): void {
    this.list = list;
  }
}
