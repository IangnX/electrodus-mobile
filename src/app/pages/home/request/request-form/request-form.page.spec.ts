import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestFormPage } from './request-form.page';

describe('RequestFormPage', () => {
  let component: RequestFormPage;
  let fixture: ComponentFixture<RequestFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
