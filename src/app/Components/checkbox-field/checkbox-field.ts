import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {InputTypeCheckBox} from '../../../types/inputTypeCheckBox';
import {Checkbox} from 'primeng/checkbox';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-checkbox-field',
  imports: [
    Checkbox,
    Message
  ],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.css',
})
export class CheckboxField {
  @Input ({required : true}) control!: AbstractControl;
  @Input() label : string = '';
  @Input() disabled = false;
  @Input() direction: 'col' | 'row' = 'row';
  @Input() InputTypeCheckBox: 'input' | 'textarea' = 'input';

  @Input() value = this.control.value;


 getFormControl(): FormControl {
  return this.control as FormControl;
 }
}
