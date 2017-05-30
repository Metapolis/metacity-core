import { HttpRequestService } from "./http-request.service";
import {} from "jasmine";

describe("Set server parameters", () => {
  const httpRequestService = new HttpRequestService();
  it("Set server adress Get server adress", (done) => {
    httpRequestService.setServerAddress("localhost");
    httpRequestService.getServerAddress()
      .then((address) => {
        expect(address).toBe("localhost");
        done();
      })
      .catch((error) => done.fail("Error"));
  });
  it("Set server Port Get server Port", (done) => {
    const mockPort: number = 2525;
    httpRequestService.setServerPort(mockPort);
    httpRequestService.getServerPort()
      .then((port) => {
        expect(port).toBe(mockPort);
        done();
      })
      .catch((error) => done.fail("Error"));
  });
});
