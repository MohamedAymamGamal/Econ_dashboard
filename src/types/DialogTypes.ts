import { Type } from '@angular/core';

export type DialogConfig<TData> = {
  data?: TData;
  component: Type<unknown>;
  header?: string;
  onSuccess?: () => void;
  model?: boolean;
  closable?: boolean;
  dismissable?: boolean;
  dismissableMask?: boolean;
  contentStyle?: Record<string, string>;
};
