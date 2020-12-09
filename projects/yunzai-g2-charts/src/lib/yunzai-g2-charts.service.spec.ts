import { TestBed } from '@angular/core/testing';

import { YunzaiG2ChartsService } from './yunzai-g2-charts.service';

describe('YunzaiG2ChartsService', () => {
  let service: YunzaiG2ChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YunzaiG2ChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
