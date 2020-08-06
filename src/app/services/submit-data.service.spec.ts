import { TestBed } from '@angular/core/testing';

import { SubmitDataService } from './submit-data.service';

describe('SubmitDataService', () => {
  let service: SubmitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
