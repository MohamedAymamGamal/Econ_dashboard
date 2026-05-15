import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import {FormMode} from '../../../types/FromMode';
import {FormActionService} from '../../../service/form-action.service';

@Component({
  selector: 'app-submit-button',
  imports: [ButtonModule],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.css',
})
export class SubmitButtonComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<void>();
  @Input({ required: true }) route!: string;
  @Input({ required: true }) mode!: FormMode;
  @Input() id?: number | string;
  @Input() fluid: boolean = false;
  @Input() label: string = '';

  @Input() icon: string = 'pi pi-save';
  @Input() redirectRoute?: string;
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;
  @Input() file: File | null = null;
  @Input() files: File[] | null = null;
  @Input() fileName: string = 'file';
  form!: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    public formAction: FormActionService,
    private router: Router,
  ) {}


  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
  }

  submit() {
    if (!this.form || this.form.invalid) return;

    if (this.file || this.files?.length) {
      const formData = new FormData();

      this.appendFormData(formData, this.form.value);

      if (this.file) {
        formData.append('file', this.file);
      }

      if (this.files?.length) {
        this.files.forEach((file: File) => {
          formData.append('files[]', file);
        });
      }

      this.formAction.execute(this.mode, this.route, formData, this.id, (res) => {
        this.form.reset();
        this.file = null;
        this.files = [];

        this.submitEvent.emit(res);

        if (this.redirectRoute) {
          this.router.navigateByUrl(this.redirectRoute);
        }
      });

      return;
    }

    this.formAction.execute(this.mode, this.route, this.form.value, this.id, (res) => {
      this.form.reset();
      this.submitEvent.emit(res);

      if (this.redirectRoute) {
        this.router.navigateByUrl(this.redirectRoute);
      }
    });
  }

  private appendFormData(formData: FormData, data: any, parentKey: string = ''): void {
    if (data === null || data === undefined) {
      return;
    }

    if (data instanceof File) {
      formData.append(parentKey, data);
      return;
    }

    if (Array.isArray(data)) {
      data.forEach((value, index) => {
        const arrayKey = parentKey ? `${parentKey}[${index}]` : `${index}`;
        this.appendFormData(formData, value, arrayKey);
      });
      return;
    }

    if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
        this.appendFormData(formData, value, fullKey);
      });
      return;
    }

    formData.append(parentKey, String(data));
  }
}
