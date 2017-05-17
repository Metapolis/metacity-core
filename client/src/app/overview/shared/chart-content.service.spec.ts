import { TestBed, inject } from '@angular/core/testing';

import { ChartContentService } from './chart-content.service';

describe('ChartContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartContentService]
    });
  });

  it('should be created', inject([ChartContentService], (service: ChartContentService) => {
    expect(service).toBeTruthy();
  }));
});
