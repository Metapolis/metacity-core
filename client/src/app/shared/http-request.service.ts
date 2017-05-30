import { Injectable, ReflectiveInjector } from "@angular/core";
import { async, fakeAsync, tick } from "@angular/core/testing";
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from "@angular/http";
import { Response, ResponseOptions } from "@angular/http";

@Injectable()
export class HttpRequestService {
  private serverAddress: string;
  private serverPort: number;

  constructor(private http: Http) { }

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

  public sendRequest(request: string): void {
    this.http.get(this.serverAddress + ":" + this.serverPort + request);
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
