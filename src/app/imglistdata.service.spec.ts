import { TestBed } from '@angular/core/testing';

import { ImglistdataService } from './imglistdata.service';

describe('ImglistdataService', () => {
  let service: ImglistdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImglistdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
