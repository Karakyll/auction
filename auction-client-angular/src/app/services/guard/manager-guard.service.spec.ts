import { TestBed, inject } from '@angular/core/testing';

import { ManagerGuard } from './manager-guard.service';

describe('ManagerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerGuard]
    });
  });

  it('should be created', inject([ManagerGuard], (service: ManagerGuard) => {
    expect(service).toBeTruthy();
  }));
});
