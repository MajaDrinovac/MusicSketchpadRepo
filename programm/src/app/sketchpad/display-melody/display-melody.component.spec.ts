import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMelodyComponent } from './display-melody.component';

describe('DisplayMelodyComponent', () => {
  let component: DisplayMelodyComponent;
  let fixture: ComponentFixture<DisplayMelodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMelodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMelodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
