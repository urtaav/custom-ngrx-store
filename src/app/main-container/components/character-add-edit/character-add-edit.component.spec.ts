import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddEditComponent } from './character-add-edit.component';

describe('CharacterAddEditComponent', () => {
  let component: CharacterAddEditComponent;
  let fixture: ComponentFixture<CharacterAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
