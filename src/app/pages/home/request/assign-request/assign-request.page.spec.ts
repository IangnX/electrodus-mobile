import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignRequestPage } from './assign-request.page';

describe('AssignRequestPage', () => {
  let component: AssignRequestPage;
  let fixture: ComponentFixture<AssignRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
