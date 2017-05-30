import { Injectable } from "@angular/core";

@Injectable()
export class HttpRequestService {
  private serverAddress: string;
  private serverPort: number;

  public setServerAddress(serverAddress: string) {
    this.serverAddress = serverAddress;
  }

  public getServerAddress(): Promise<string> {
    return Promise.resolve(this.serverAddress);
  }

  public setServerPort(serverPort: number) {
    this.serverPort = serverPort;
  }

  public getServerPort(): Promise<number> {
    return Promise.resolve(this.serverPort);
  }
}
