import { afterRenderEffect, Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-form.html',
  styleUrl: './update-form.scss',
})
export class UpdateForm {

  updatedIndex = input.required<number>();
  onUpdatedForm = output<string>();

  formGroup = new FormGroup({
    newName: new FormControl("default"),
  });

  onSubmit() {
    const newValue = (this.formGroup.value.newName ?? "") + this.updatedIndex();
    this.onUpdatedForm.emit(newValue);
  }
}
