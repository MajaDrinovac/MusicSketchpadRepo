import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMelodyComponent } from './edit-melody.component';

describe('EditMelodyComponent', () => {
  let component: EditMelodyComponent;
  let fixture: ComponentFixture<EditMelodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMelodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMelodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
