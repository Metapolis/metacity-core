import { TestBed, inject } from "@angular/core/testing";

import { MapContentService } from "./map-content.service";

describe("MapContentService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapContentService]
    });
  });

  it("should be created", inject([MapContentService], (service: MapContentService) => {
    expect(service).toBeTruthy();
  }));
});
