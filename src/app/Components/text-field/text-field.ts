import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule} from '@angular/forms';

import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {MessageModule} from 'primeng/message';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';

@Component({
  selector: 'app-text-field',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    MessageModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,

  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField {
  @Input({required:true})control!:AbstractControl;
  @Input() label : string = '';
  @Input() inputType: 'input' | 'textarea' = 'input';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() rows = 3;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() icon = 'pi pi-pencil';
  @Input() value = this.control?.value;
  @Input() validate = true;
  @Input() direction: 'col' | 'row' = 'row';

  passwordVisible = false;

  getFormControl(): FormControl {
    return this.control as FormControl;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  get inputTypeForPassword() {
    return this.type === 'password' && this.passwordVisible ? 'text' :this.type;
  }

}
