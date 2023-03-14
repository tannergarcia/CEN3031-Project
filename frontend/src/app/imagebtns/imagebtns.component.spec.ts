import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagebtnsComponent } from './imagebtns.component';

describe('ImagebtnsComponent', () => {
  let component: ImagebtnsComponent;
  let fixture: ComponentFixture<ImagebtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagebtnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagebtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
