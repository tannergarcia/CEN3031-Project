import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeCloseComponent } from './encode-close.component';

describe('EncodeCloseComponent', () => {
  let component: EncodeCloseComponent;
  let fixture: ComponentFixture<EncodeCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncodeCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncodeCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
