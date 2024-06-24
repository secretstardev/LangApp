import { BaseResponseMeta } from '@app/libs/core/models';
import { PaginationData } from '@ngneat/elf-pagination';

export const metaToStorePagination: (meta?: BaseResponseMeta | null) => PaginationData = (meta: BaseResponseMeta) => ({
  perPage: meta?.perPage || 0,
  total: meta?.totalCount || 0,
  lastPage: meta?.pageCount,
  currentPage: meta?.currentPage || 0,
});
