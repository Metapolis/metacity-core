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
      .then((answer: Response) => this.extractAnswer(answer))
      .catch((e) => this.handleError(e));
  }

  private extractAnswer(answer: Response): string {
    if (typeof(answer.status) === "number" && (answer.status > 299 || answer.status < 200)) {
      throw new Error("404");
    }
    return answer.text().toString();
  }

  public forgeURL(requestForm: RequestForm): string {
    let url: string = "/api/" + requestForm.path + "?";
    let first: boolean = true;
    for (const entry of requestForm.params) {
      if (!first) {
        url += "&";
      }
      url += entry["key"] + "=" + entry["value"];
      first = false;
    }
    return url;
  }

  public getRequestData(requestForm: RequestForm): Promise<string> {
    return this.sendRequest(this.forgeURL(requestForm));
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
