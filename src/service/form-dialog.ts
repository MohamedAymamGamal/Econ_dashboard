import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogConfig } from '../types/DialogTypes';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class formDialog {
  constructor(private dialogService: DialogService) {}

  open<TData, TResult = unknown>(config: DialogConfig<TData>): DynamicDialogRef | null {
    const ref = this.dialogService.open(config.component, {
      data: config.data,
      header: config.header,
      modal: config.model,
      closable: config.closable,
      dismissableMask: config.dismissableMask,
      contentStyle: config.contentStyle ?? { overflow: 'visible' },
    });

    ref?.onClose.subscribe((result: TResult | undefined) => {
      if (config.onSuccess) {
        config.onSuccess();
      }
    });

    return ref;
  }

  afterClose<TResult>(ref: DynamicDialogRef): Observable<TResult> {
    return ref.onClose as Observable<TResult>;
  }
}
