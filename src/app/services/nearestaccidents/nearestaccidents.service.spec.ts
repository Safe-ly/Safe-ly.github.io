import { TestBed } from '@angular/core/testing';

import { NearestAccidentsService } from './nearest-accidents.service';

describe('NearestaccidentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NearestAccidentsService = TestBed.get(NearestAccidentsService);
    expect(service).toBeTruthy();
  });
});
