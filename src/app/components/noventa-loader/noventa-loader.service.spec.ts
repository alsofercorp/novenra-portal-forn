import { TestBed } from '@angular/core/testing';

import { NoventaLoaderService } from './noventa-loader.service';

describe('NoventaLoaderService', () => {
  let service: NoventaLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoventaLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
