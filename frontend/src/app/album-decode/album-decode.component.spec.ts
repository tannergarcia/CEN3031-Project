import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDecodeComponent } from './album-decode.component';

describe('AlbumDecodeComponent', () => {
  let component: AlbumDecodeComponent;
  let fixture: ComponentFixture<AlbumDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumDecodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
