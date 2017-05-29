import { HttpRequestService } from "./http-request.service";
import {} from "jasmine";

describe("Http request service test", () => {
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
});
