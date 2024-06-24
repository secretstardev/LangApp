export interface BaseResponse<T> {
  items: T[];
  _meta?: BaseResponseMeta;
}

export interface BaseResponseMeta {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}
