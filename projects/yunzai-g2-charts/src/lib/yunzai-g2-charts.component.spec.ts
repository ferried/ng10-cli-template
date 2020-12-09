import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YunzaiG2ChartsComponent } from './yunzai-g2-charts.component';

describe('YunzaiG2ChartsComponent', () => {
  let component: YunzaiG2ChartsComponent;
  let fixture: ComponentFixture<YunzaiG2ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YunzaiG2ChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YunzaiG2ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
