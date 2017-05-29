import { HttpRequestService } from "./http-request.service";
import {} from "jasmine";
import { Injectable, ReflectiveInjector } from "@angular/core";
import { async, fakeAsync, tick } from "@angular/core/testing";
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from "@angular/http";
import { Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

describe("Set server parameters", () => {
  this.injector = ReflectiveInjector.resolveAndCreate([
    { provide: ConnectionBackend, useClass: MockBackend },
    { provide: RequestOptions, useClass: BaseRequestOptions },
    Http,
    HttpRequestService,
  ]);
  this.backend = this.injector.get(ConnectionBackend) as MockBackend;
  this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  this.httpRequestService = this.injector.get(HttpRequestService);
  it("Set server adress Get server adress", (done) => {
    this.httpRequestService.setServerAddress("localhost");
    this.httpRequestService.getServerAddress()
      .then((address) => {
        expect(address).toBe("localhost");
        done();
      })
      .catch((error) => done.fail("Error"));
  });
  it("Set server Port Get server Port", (done) => {
    const mockPort: number = 2525;
    this.httpRequestService.setServerPort(mockPort);
    this.httpRequestService.getServerPort()
      .then((port) => {
        expect(port).toBe(mockPort);
        done();
      })
      .catch((error) => done.fail("Error"));
  });
});

describe("get data from server", () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      HttpRequestService,
    ]);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
    this.httpRequestService = this.injector.get(HttpRequestService);
    const serverPort: number = 4200;
    const serverAdress: string = "metacity.xyz";
    this.httpRequestService.setServerPort(serverPort);
    this.httpRequestService.setServerAddress(serverAdress);
  });

  it("Fetch Data try to connect to the server address and port", () => {
    this.httpRequestService.sendRequest("/api/foobar");
    expect(this.lastConnection).toBeDefined("no http service connection at all?");
    expect(this.lastConnection.request.url).toMatch(/api\/foobar$/, "url invalid");
  });

});
