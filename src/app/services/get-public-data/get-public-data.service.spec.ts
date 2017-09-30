import { TestBed, inject } from '@angular/core/testing';

import { GetPublicDataService } from './get-public-data.service';

describe('GetPublicDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPublicDataService]
    });
  });

  it('should ...', inject([GetPublicDataService], (service: GetPublicDataService) => {
    expect(service).toBeTruthy();
  }));
});
