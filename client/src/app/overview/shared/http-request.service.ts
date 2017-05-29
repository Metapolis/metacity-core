import { Injectable } from "@angular/core";

@Injectable()
export class HttpRequestService {
  private serverAddress: string;

  public setServerAddress(serverAddress: string) {
    this.serverAddress = serverAddress;
  }

  public getServerAddress(): Promise<string> {
    return Promise.resolve(this.serverAddress);
  }
}
