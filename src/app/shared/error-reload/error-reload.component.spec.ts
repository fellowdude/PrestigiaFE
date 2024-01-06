import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReloadComponent } from './error-reload.component';

describe('ErrorReloadComponent', () => {
  let component: ErrorReloadComponent;
  let fixture: ComponentFixture<ErrorReloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorReloadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
