import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputType} from '../../../../types/inputs';
import {InputNumber} from 'primeng/inputnumber';
import {Password} from 'primeng/password';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {FloatLabel, FloatLabelModule} from 'primeng/floatlabel';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-reuse-inputs',
  imports: [
    InputNumber,
    Password,
    ReactiveFormsModule,
    InputTextModule,
    Message,
    FloatLabelModule,
    Textarea,
    FloatLabel
  ],
  templateUrl: './reuse-inputs.html',
  styleUrl: './reuse-inputs.css',
})
export class ReuseInputs implements OnInit {

  @Input() control!: AbstractControl;

  @Input() type: InputType = 'text';
  @Input() label = '';
  @Input() rows = 4;
  @Input() inputId = `inp-${Math.random().toString(36).slice(2, 7)}`;

  /** Cast once so templates can use [formControl] directly */
  asFormControl!: FormControl;

  ngOnInit(): void {

    this.asFormControl = this.control as FormControl;
  }

  // ── Derived state ──────────────────────────────────────────────────────────

  get hasError(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  get isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  get errorClass(): string {
    return this.hasError
      ? 'border-red-400 focus:ring-red-200 bg-red-50'
      : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-400';
  }

  get errorMessages(): string[] {
    const errors = this.control.errors;
    if (!errors) return [];

    const msgs: string[] = [];
    const field = this.label || 'This field';

    if (errors['required'])     msgs.push(`${field} is required.`);
    if (errors['email'])        msgs.push('Please enter a valid email address.');
    if (errors['minlength'])    msgs.push(`Minimum ${errors['minlength'].requiredLength} characters required.`);
    if (errors['maxlength'])    msgs.push(`Maximum ${errors['maxlength'].requiredLength} characters allowed.`);
    if (errors['min'])          msgs.push(`Value must be at least ${errors['min'].min}.`);
    if (errors['max'])          msgs.push(`Value must be at most ${errors['max'].max}.`);
    if (errors['pattern'])      msgs.push('Invalid format.');
    if (errors['passwordWeak']) msgs.push('Password is too weak.');
    if (errors['custom'])       msgs.push(errors['custom']);

    return msgs;
  }

}
