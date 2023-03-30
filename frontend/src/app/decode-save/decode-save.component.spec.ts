import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeSaveComponent } from './decode-save.component';

describe('DecodeSaveComponent', () => {
  let component: DecodeSaveComponent;
  let fixture: ComponentFixture<DecodeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecodeSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecodeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
