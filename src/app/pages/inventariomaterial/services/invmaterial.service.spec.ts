import { TestBed } from '@angular/core/testing';

import { InvmaterialService } from './invmaterial.service';

describe('InvmaterialService', () => {
  let service: InvmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
