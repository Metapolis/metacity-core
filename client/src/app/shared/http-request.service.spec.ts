import {} from "jasmine";
import { Injectable, ReflectiveInjector } from "@angular/core";
import { async, fakeAsync, tick } from "@angular/core/testing";
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from "@angular/http";
import { Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { HttpRequestService } from "./http-request.service";
import { RequestForm } from "../common/request-form";

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
    this.http = this.injector.get(Http);
    const serverPort: number = 4200;
    const serverAdress: string = "https://metacity.xyz";
    this.httpRequestService.setServerPort(serverPort);
    this.httpRequestService.setServerAddress(serverAdress);
    const mockUrlValue: RequestForm = {
      path: "trafics/accidents",
      params: [
        {key: "login", value: "roberto"},
        {key: "password", value: "shut"}
      ]
    };
    this.mockUrlValue = mockUrlValue;
  });

  it("Fetch Data try to connect to the server address and port work on server side", () => {
    this.httpRequestService.sendRequest("/api/foobar");
    expect(this.lastConnection).toBeDefined("no http service connection at all?");
    expect(this.lastConnection.request.url).toMatch(/api\/foobar$/, "url invalid");
    expect(this.lastConnection.request.url).toBe("https://metacity.xyz:4200/api/foobar", "url not fully written");
  });
  it("Request Content fetch a content string", fakeAsync(() => {
    let result: string;
    const mockRespond: string = "It could be a JSON";
    this.httpRequestService.sendRequest().then((answer: string) => result = answer);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: mockRespond
    })));
    tick();
    expect(result).toEqual(mockRespond);
  }));
  it("Give key/values retrive URL with simple data", () => {
    expect(this.httpRequestService.forgeURL(this.mockUrlValue)).toBe("/api/trafics/accidents?login=roberto&password=shut");
  });
  it("Request get data return the data", fakeAsync(() => {
    let result: string;
    const mockRespond: string = "It could be a JSON as well";
    this.httpRequestService.getRequestData(this.mockUrlValue).then((answer: string) => result = answer);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: mockRespond
    })));
    tick();
    expect(result).toEqual(mockRespond);
  }));
  it("Request doesn't return 2xx raise exeption", fakeAsync(() => {
    let result: string;
    let error: any;
    this.httpRequestService.getRequestData(this.mockUrlValue)
      .then((answer: string) => result = answer)
      .catch((err: any) => error = err);
    this.lastConnection.mockRespond(new Response(new ResponseOptions ({
      status: 404,
      statusText: "Too Bad"
    })));
    tick();
    expect(result).toBeUndefined();
    expect(error).toBeDefined();
  }));
});
