import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBetsComponent } from './manage-bets.component';

describe('ManageBetsComponent', () => {
  let component: ManageBetsComponent;
  let fixture: ComponentFixture<ManageBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
