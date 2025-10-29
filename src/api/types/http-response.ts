export interface ErrorDetail {
  field: string;
  message: string;
}

export type HttpResponse<T = undefined> = {
  status: 'SUCCESS' | 'FAIL' | string;
  message: string;
  errors?: ErrorDetail[];
} & (T extends undefined ? { data?: T } : { data: T });
