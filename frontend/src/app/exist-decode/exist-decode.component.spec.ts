import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistDecodeComponent } from './exist-decode.component';

describe('ExistDecodeComponent', () => {
  let component: ExistDecodeComponent;
  let fixture: ComponentFixture<ExistDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistDecodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
