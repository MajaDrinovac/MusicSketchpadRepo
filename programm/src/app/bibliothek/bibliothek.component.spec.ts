import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekComponent } from './bibliothek.component';

describe('BibliothekComponent', () => {
  let component: BibliothekComponent;
  let fixture: ComponentFixture<BibliothekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliothekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliothekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
