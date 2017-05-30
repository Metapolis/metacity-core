import { Injectable, ReflectiveInjector } from "@angular/core";
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from "@angular/http";
import { Response, ResponseOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { RequestForm } from "../common/request-form";

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

  public sendRequest(request: string): Promise<string> {
     return this.http.get(this.serverAddress + ":" + this.serverPort + request)
      .toPromise()
      .then((answer) => answer.text().toString())
      .catch((e) => this.handleError(e));
  }

  public forgeURL(requestForm: RequestForm): string {
    let url: string = "/api/" + requestForm.root + "?";
    let first: boolean = true;
    for (const entry of requestForm.filters) {
      if (!first) {
        url += "&";
      }
      url += entry["key"] + "=" + entry["value"];
      first = false;
    }
    return url;
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
