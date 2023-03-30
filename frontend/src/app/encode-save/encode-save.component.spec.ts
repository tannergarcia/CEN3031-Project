import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeSaveComponent } from './encode-save.component';

describe('EncodeSaveComponent', () => {
  let component: EncodeSaveComponent;
  let fixture: ComponentFixture<EncodeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncodeSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncodeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
