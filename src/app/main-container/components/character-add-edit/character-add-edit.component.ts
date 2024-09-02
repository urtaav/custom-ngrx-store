import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomInputComponent } from '@app/components';
import { emptyCharacter } from '@app/models';
import { GlobalStore } from '@app/store/global.store';


interface CharacterForm {
  name: FormControl<string>;
  image: FormControl<string>;
}


@Component({
  selector: 'app-character-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './character-add-edit.component.html',
  styleUrl: './character-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterAddEditComponent {
  id = input<number>();
  readonly store = inject(GlobalStore);
  readonly router = inject(Router);

  characterToEdit = computed(() => this.store.getCharacter(Number(this.id())) ?? emptyCharacter);

  characterForm: Signal<FormGroup> = computed(() => {
    return new FormGroup<CharacterForm>({
      name: new FormControl(this.characterToEdit().name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      image: new FormControl(this.characterToEdit().image, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })
  });


  onSubmit = (): void => {
    if (this.characterForm().valid) {
      const character = {
        ...(this.id() ? { id: Number(this.id()) } : {}),
        ...this.characterForm().value
      };

      const methodToUse = this.id() ? 'updateCharacter' : 'addCharacter';
      console.log({methodToUse})
      this.store[methodToUse](character);
      this.characterForm().reset();
      // this.router.navigate(['/characters'])
    }
  }
}
