export type ErrorDetail = {
  field: string;
  message: string;
};

export type HttpResponse<T = unknown> = {
  status: 'SUCCESS' | 'FAIL' | string;
  message: string;
  errors?: ErrorDetail[];
} & (T extends unknown ? { data?: T } : { data: T });
