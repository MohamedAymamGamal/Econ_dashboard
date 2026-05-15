import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import {API} from './api';
import {FormMode} from '../types/FromMode';
import {Toast} from './toast';


@Injectable({ providedIn: 'root' })
export class FormActionService {
  loading = false;

  constructor(
    private api: API,
    private confirm: ConfirmationService,
    private toast: Toast,
  ) {}

  execute(
    mode: FormMode,
    route: string,
    formData: any,
    id?: number | string,
    onSuccess?: (res: any) => void,
  ) {
    const callApi = () => {
      switch (mode) {
        case 'create':
          return this.api.store(route, formData);
        case 'update':
          if (!id) throw new Error('Update mode requires an id');
          return this.api.update(route, id, formData);
        case 'delete':
          if (!formData) throw new Error('Delete mode requires data (ids)');
          return this.api.destroy(route, formData);
      }
    };

    if (mode === 'delete') {
      this.confirm.confirm({
        message: 'هل أنت متأكد من الحذف؟',
        accept: () => this.run(callApi, onSuccess),
      });
    } else {
      this.run(callApi, onSuccess);
    }
  }

  private run(requestFn: () => Observable<any>, onSuccess?: (res: any) => void) {
    this.loading = true;

    requestFn().subscribe({
      next: (res) => {
        this.loading = false;

      this.toast.success(
        'success',
        res?.message ?? 'there is something wrong'
      )

        onSuccess?.(res);
      },
      error: (err) => {
        this.loading = false;

        this.toast.error(
          'error',
          err?.error?.message ?? 'حدث خطأ ما'
        )
      },
    });
  }
}
