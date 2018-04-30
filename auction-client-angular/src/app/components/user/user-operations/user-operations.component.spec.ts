import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOperationsComponent } from './user-operations.component';

describe('UserOperationsComponent', () => {
  let component: UserOperationsComponent;
  let fixture: ComponentFixture<UserOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
