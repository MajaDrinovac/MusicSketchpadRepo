import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodyTitleComponent } from './melody-title.component';

describe('MelodyTitleComponent', () => {
  let component: MelodyTitleComponent;
  let fixture: ComponentFixture<MelodyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MelodyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MelodyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
